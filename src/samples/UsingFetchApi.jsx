import React, { useEffect, useState } from 'react'

function UsingFetchApi() {
	const [users, setUsers] = useState([])

	const fetchData = () => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then(response => {
				return response.json()
			})
			.then(data => {
				// useState sayesinde state yönetimi sağlıyoruz.
				setUsers(data)
			})
	}

	// component mount olduğunda çalışır.
	useEffect(() => {
		fetchData()
	}, [])

  return (
    <div>
      <h1>Kullanıcı Listesi</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default UsingFetchApi