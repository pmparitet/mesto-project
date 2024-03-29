const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-23',
  headers: {
    authorization: 'f573e011-92da-4150-bd2f-6bf7fb5dd4b1',
    'Content-Type': 'application/json'
  }
}

const checkResponse = ((res) => {
  if (res.ok) {
    return res.json()
  }

  return Promise.reject(`Ошибка: ${res.status}`)
})

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => {
    return checkResponse(res)
  })
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => {
    return checkResponse(res)
  })
}

 const editProfil = (data) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data)
  })
  .then((res) => {
    return checkResponse(res)
  })
}

const saveCard = (data) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(data)
  })
  .then((res) => {
    return checkResponse(res)
  })
}

const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then((res) => {
    return checkResponse(res)
  })
}

const addLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then((res) => {
    return checkResponse(res)
  })
}

const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then((res) => {
    return checkResponse(res)
  })
}

const editAvatar = (data) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(data)
  })
  .then((res) => {
    return checkResponse(res)
  })
}


export { getUserInfo,
  getInitialCards,
  editProfil,
  saveCard,
  deleteCard,
  addLike,
  deleteLike,
  editAvatar
}
