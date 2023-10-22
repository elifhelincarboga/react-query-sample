import React, { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from 'react-query';

const addProduct = (name) => {
  fetch('https://northwind.vercel.app/api/products', {
  	method: 'POST',
  	headers: {
    	'Content-Type': 'application/json',
  	},
  	body: JSON.stringify({name: name})
})
};

const fetchProduct = async () => {
  const response = await fetch("https://northwind.vercel.app/api/products");
  return response.json();
};

function Sample2() {
	const { data, error, isLoading, isFetching } = useQuery("product", fetchProduct);
	const [name, setName] = useState('');

  const queryClient = useQueryClient();

	// veri güncelleme için kullanılır.
  const mutation = useMutation(addProduct, {
    // Başarılı bir işlem sonrasında yapılacak işlemleri buraya yazabiliriz.
    onSuccess: () => {
      // Yeni bir veri geldiğinde ilgili query'i yeniden sorgulayabiliriz. (örenğin listeyi yeniden çekmek)
      queryClient.invalidateQueries('product'); // cache siler
    },

		// başlamadan önceyi ifade eder. Bizim durumumuzda istek atılmadan önceyi. optimistic update yapılabilir burada.
		// optimistic update: post isteği attıktan ve henüz başarılı cevabı gelmeden başarılı gibi davranıp ona göre işlem yapmak. (örneğin listeye eleman eklemek)
		// onMutate: (variables) => {
		// },

		// Hata olunca devreye girer
		// onError: (error, variables, context) => {
		// },

		// İstek bittikten sonra en son çalışan kısım
		// onSettled: (data, error, variables, context) => {
		// },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(name);
  };

	let list;

  if (isLoading) {
    list = <div>Veri yükleniyor...</div>;
  }

  else if (error) {
    list = <div>Hata: {error.message}</div>;
  }

	else {
		list = <div>
						<h1>Ürün Listesi</h1>
						<ul>
							{data.map((product) => (
								<li key={product.id}>{product.name}</li>
							))}
						</ul>
					</div>
	}

	return (
		<>
			<div >
				<h2>Yeni Ürün Ekle</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<button type="submit" disabled={isFetching}>
						{isFetching ? 'Ekleniyor...' : 'Ekle'}
					</button>
				</form>
			</div>
			{ list }
		</>
	);
}

export default Sample2;
