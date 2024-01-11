import './pages/index.css';
import { initialCards, createCard, like } from './scripts/cards.js'
import { openModal, closeModal } from './scripts/modal.js'

// Вывести карточки на страницу
const cardsContainer = document.querySelector(".places__list");
initialCards.forEach((card) => {
  cardsContainer.append(createCard(card, like, showImage));
});
// Функция открытия попапа
const popupImage = document.querySelector(".popup_type_image");
function showImage(card) {
  popupImage.querySelector(".popup__caption").textContent = card.name;
  popupImage.querySelector(".popup__image").src = card.link;
  popupImage.querySelector(".popup__image").alt = card.name;
  openModal(popupImage);
}
// Форма редактирования
const buttonEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
buttonEdit.addEventListener('click', function () {
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');

  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;

  openModal(popupEdit);
});
// Отправка формы редактирования
const formElement = document.forms["edit-profile"] ;
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
function handleFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const profileTitle = document.querySelector(".profile__title");
    const profileJob = document.querySelector(".profile__description");

    profileTitle.textContent = nameValue;
    profileJob.textContent = jobValue;

    closeModal(popupEdit);
}
formElement.addEventListener('submit', handleFormSubmit);
// Форма добавления карточки
const buttonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
buttonAdd.addEventListener('click', function () {
  openModal(popupAdd);
});
// Отправка формы добавления карточки
const formNew = document.forms["new-place"] ;
const placeInput = formNew.querySelector(".popup__input_type_card-name");
const urlInput = formNew.querySelector(".popup__input_type_url");
function addFormSubmit(evt) {
    evt.preventDefault();

    const card = [];
    card.name = placeInput.value;
    card.link = urlInput.value;
    cardsContainer.prepend(createCard(card, like, showImage));
    
    formNew.reset();

    closeModal(popupAdd);
}
formNew.addEventListener('submit', addFormSubmit);