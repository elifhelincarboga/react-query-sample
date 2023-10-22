import React from "react";
import { useQuery } from "react-query";

const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Veri alınamadı");
  }
  return response.json();
};

function Sample1 () {
  // useQuery parametre olarak bir key ve method alır.
  const { data, error, isLoading } = useQuery("users", fetchUsers, {
    retry: 0, // hata alınca kaç kere isteğin tekrarlamasını istiyorsak buraya giriyoruz, default değer 3
    // refetchInterval: 1000 // belli aralıklarla isteği yenileme
  })

  console.log("data: ", data )
  console.log("error: ", error)
  console.log("loading: ", isLoading)

  if (isLoading) {
    return <div>Veri yükleniyor...</div>;
  }

  if (error) {
    return <div>Hata: {error.message}</div>;
  }

  return (
    <div>
      <h1>Kullanıcı Listesi</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Sample1;
