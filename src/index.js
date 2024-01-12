import './pages/index.css';
import { initialCards } from './scripts/cards.js'
import { createCard, deleteCard, like } from './scripts/card.js'
import { openModal, closeModal } from './scripts/modal.js'

// Вывести карточки на страницу
const cardsContainer = document.querySelector(".places__list");
initialCards.forEach((card) => {
  cardsContainer.append(createCard(card, deleteCard, like, showImage));
});
// Функция открытия попапа с картинкой
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
const formEditProfile = document.forms["edit-profile"] ;
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
function submitFormEditProfile(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const profileTitle = document.querySelector(".profile__title");
    const profileJob = document.querySelector(".profile__description");

    profileTitle.textContent = nameValue;
    profileJob.textContent = jobValue;

    closeModal(popupEdit);
}
formEditProfile.addEventListener('submit', submitFormEditProfile);
// Форма добавления карточки
const buttonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
buttonAdd.addEventListener('click', function () {
  openModal(popupAdd);
});
// Отправка формы добавления карточки
const formNewPlace = document.forms["new-place"] ;
const placeInput = formNewPlace.querySelector(".popup__input_type_card-name");
const urlInput = formNewPlace.querySelector(".popup__input_type_url");
function submitFormNewPlace(evt) {
    evt.preventDefault();

    const card = {
      name: placeInput.value,
      link: urlInput.value,
    }
    cardsContainer.prepend(createCard(card, deleteCard, like, showImage));
    
    formNewPlace.reset();

    closeModal(popupAdd);
}
formNewPlace.addEventListener('submit', submitFormNewPlace);