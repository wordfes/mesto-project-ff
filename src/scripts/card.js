// Функция создания карточки
const cardTemplate = document.querySelector("#card-template").content;
function createCard(card, deleteCard, like, showImage) {
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
// Функция удаления карточки
function deleteCard(currentCard) {
  currentCard.remove();
} 
// Функция лайка
function like(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active')
}
// Экспорт функций создания карточек, их удаления и лайка
export { createCard, deleteCard, like }; 