import * as api from "./api.js";
// Функция создания карточки
const cardTemplate = document.querySelector("#card-template").content;
export function createCard(card, handleDeleteCard, like, showImage, showDeletePopup, profileId) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const currentCard = cardElement.querySelector(".card");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeNumber = cardElement.querySelector(".card__like-number");
  const isLiked = card.likes.some((item) => item._id === profileId);

  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;

  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  cardLikeNumber.textContent = card.likes.length;

  currentCard.dataset.cardId = card._id;

  if (card.owner._id === profileId) {
    deleteButton.id = card._id;
    deleteButton.addEventListener("click", () => showDeletePopup(currentCard));
  } else {
    deleteButton.remove();
  }
  
  likeButton.addEventListener('click', () => like(currentCard));

  cardImage.addEventListener('click', () => showImage(card));

  return cardElement;
}
// Функция удаления карточки
export function handleDeleteCard(cartID) {
  const currentCard = document.querySelector('[data-card-id="'+ cartID +'"]');
  api
  .deleteCard(cartID)
  .then(() => {
    currentCard.remove();
  })
  .catch((err) => console.error(`Не удалось удалить карту ${err}`));
} 
// Функция лайка
export function like(currentCard) {
  const likeButton = currentCard.querySelector(".card__like-button");
  const cardLikeNumber = currentCard.querySelector(".card__like-number");

  if (likeButton.classList.contains("card__like-button_is-active")) {
    api
      .deleteLike(currentCard.dataset.cardId)
      .then((res) => {
        likeButton.classList.remove("card__like-button_is-active");
        cardLikeNumber.textContent = res.likes.length;
      })
      .catch((err) => console.error(`Не удалось удалить лайк ${err}`));
  } else {
    api
      .addLike(currentCard.dataset.cardId)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        cardLikeNumber.textContent = res.likes.length;
      })
      .catch((err) => console.error(`Не удалось добавить лайк ${err}`));
  }
}