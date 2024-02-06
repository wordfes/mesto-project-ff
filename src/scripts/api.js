// Конфиг запросов к API
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
  headers: {
    authorization: '4fb1401a-9b46-4a10-9f7d-58bd05780dd6',
    'Content-Type': 'application/json'
  }
};
// Получение информации пользователя
export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
// Получение данных карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
// Изменение данных пользователя
export const changeProfileInfo = (username, description) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: username,
      about: description 
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
// Добавление новой карточки
export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
// Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
// Смена аватара
export const setAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({avatar: avatarLink})
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
// Отправка лайка
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
// Удаление лайка
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
};