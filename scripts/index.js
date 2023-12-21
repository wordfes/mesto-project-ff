// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const thisCard = cardElement.querySelector(".card");
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__image").alt = card.name;
  deleteButton.addEventListener("click", () => deleteCard(thisCard));
  return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(thisCard) {
  thisCard.remove();
} 
// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  cardsContainer.append(createCard(card));
});