const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: '5c7e4a88-915b-41bd-ae8c-c3716164a1c9',
    'Content-Type': 'application/json'
  }
}

const handleThen = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

const handleCatch = (err) => {
  console.log(err)
}

const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(handleThen)
    .catch(handleCatch)
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(handleThen)
    .catch(handleCatch)
}

function patchProfileInfo(name, about) {
  return Promise.all([getProfileInfo, getInitialCards])
    .then(() => {
      fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: name,
          about: about,
        })
      })
    })
    .then(handleThen)
    .catch(handleCatch)
}

function postNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
    .then(handleThen)
    .catch(handleCatch)
}

const deleteCard = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleThen)
    .catch(handleCatch)
}

const putLikeOnCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: config.headers
  })
    .then(handleThen)
    .catch(handleCatch)
}

const deleteLikeOnCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(handleThen)
    .catch(handleCatch)
}

function patchProfileAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    })
  })
    .then(handleThen)
    .catch(handleCatch)

}
export { getProfileInfo, getInitialCards, patchProfileInfo, postNewCard, putLikeOnCard, deleteLikeOnCard, deleteCard, patchProfileAvatar }