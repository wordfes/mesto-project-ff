// Массив с данными карточек
const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];
// Функция создания карточки
const cardTemplate = document.querySelector("#card-template").content;
function createCard(card, like, showImage) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const currentCard = cardElement.querySelector(".card");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;

  deleteButton.addEventListener("click", () => deleteCard(currentCard));
  
  likeButton.addEventListener('click', () => like(likeButton));

  cardImage.addEventListener('click', () => showImage(card));

  return cardElement;
}
// Функция лайка
function like(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active')
}
// Функция удаления карточки
function deleteCard(currentCard) {
  currentCard.remove();
} 
// Эксопрт массива карточек и функции создания карточек и лайка
export { initialCards, createCard, like }; 