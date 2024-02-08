import './pages/index.css';
import * as api from "./scripts/api.js";
import { createCard, removeCard, like } from './scripts/card.js'
import { openModal, closeModal } from './scripts/modal.js'
import { enableValidation, clearValidation } from './scripts/validation.js'

// Объявление глобальных переменных
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardsContainer = document.querySelector(".places__list");

const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const cardModal = document.querySelector(".popup_type_image");
const captionCardModal = cardModal.querySelector(".popup__caption");
const imageCardModal = cardModal.querySelector(".popup__image");

const buttonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");

const buttonEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");

const buttonEditAvatar = document.querySelector(".profile__avatar-button");
const popupEditAvatar = document.querySelector(".popup_type_avatar");

const popupDeleteCard = document.querySelector(".popup_type_delete-card");

const formNewPlace = document.forms["new-place"] ;
const placeInput = formNewPlace.querySelector(".popup__input_type_card-name");
const urlInput = formNewPlace.querySelector(".popup__input_type_url");

const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

const formEditAvatar = document.forms["edit-avatar"];
const avatarInput = formEditAvatar.querySelector(".popup__input_type_avatar");

const formDeletePlace = document.forms["delete-place"];

let profileId;
let cardForDelete = {};

// Функция открытия попапа с формой редактирования профиля
function openEditPopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;
  openModal(popupEdit);
}
// Функция открытия попапа с картинкой
function openImagePopup(card) {
  captionCardModal.textContent = card.name;
  imageCardModal.src = card.link;
  imageCardModal.alt = card.name;
  openModal(cardModal);
}
// Функция открытия попапа с подтверждением удаления карточки
function openDeleteConfirmationPopup(cardId, currentCard) {
  cardForDelete = {
    id: cardId,
    element: currentCard
  };
  openModal(popupDeleteCard);
}
// Функция изменения текста кнопки
function renderLoading(submitButton, isLoading, buttonText = "Сохранить", loadingText = "Сохранение...") {
  if (isLoading) {
    submitButton.textContent = loadingText;
  } else {
    submitButton.textContent = buttonText;
  }
}
// Функция отправки данных на сервер
function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(submitButton, true, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(submitButton, false, initialText);
    });
}
// Функция отправки формы редактирования профиля
function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return api.changeProfileInfo(nameInput.value, jobInput.value).then((result) => {
      profileTitle.textContent = result.name;
      profileJob.textContent = result.about;
      clearValidation(formEditProfile, validationConfig);
      closeModal(popupEdit);
    });
  }
  handleSubmit(makeRequest, evt);
}
// Функция отправки формы редактирования аватара
function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return api.setAvatar(avatarInput.value).then((result) => {
      profileImage.style.backgroundImage = 'url(' + result.avatar + ')';
      clearValidation(formEditAvatar, validationConfig);
      closeModal(popupEditAvatar);
    });
  }
  handleSubmit(makeRequest, evt);
}
// Функция отправки формы добавления карточки
function handleCardFormSubmit(evt) {
  function makeRequest() {
    return api.addCard(placeInput.value, urlInput.value).then((card) => {
      cardsContainer.prepend(
        createCard(card, removeCard, like, openImagePopup, openDeleteConfirmationPopup, profileId)
      );
      formNewPlace.reset();
      clearValidation(formNewPlace, validationConfig);
      closeModal(popupAdd);
    });
  }
  handleSubmit(makeRequest, evt)
}
// Функция отправки формы удаления карточки
function handleConfirmDeleteSubmit(evt) {
  function makeRequest() {
    return api.deleteCard(cardForDelete.id).then((result) => {
      removeCard(cardForDelete.element);
      closeModal(popupDeleteCard);
    });
  }
  handleSubmit(makeRequest, evt);
}
// Вывести карточки и данные профиля на страницу
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profileDetails, cards]) => {
    profileId = profileDetails._id;
    profileImage.style.backgroundImage = 'url(' + profileDetails.avatar + ')'; 
    profileTitle.textContent = profileDetails.name;
    profileJob.textContent = profileDetails.about;

    cards.forEach((card) => {
      cardsContainer.append(createCard(card, removeCard, like, openImagePopup, openDeleteConfirmationPopup, profileId));
    });
  })
  .catch((error) =>
    console.error("Ошибка получения данных по карточкам и профилю", error)
  );
// Открытие формы добавления карточки
buttonAdd.addEventListener('click', function () {
  openModal(popupAdd);
});
// Открытие формы редактирования профиля
buttonEdit.addEventListener('click', () => openEditPopup());
// Открытие формы редактирования аватара
buttonEditAvatar.addEventListener('click', function () {
  openModal(popupEditAvatar);
});
// Добавление слушателя к отправке формы редактирования профиля
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
// Добавление слушателя к отправке формы редактирования аватара
formEditAvatar.addEventListener('submit', handleAvatarFormSubmit);
// Добавление слушателя к отправке формы добавления карточки
formNewPlace.addEventListener('submit', handleCardFormSubmit);
// Добавление слушателя к отправке формы удаления карточки
formDeletePlace.addEventListener('submit', handleConfirmDeleteSubmit);
// Включение валидации форм
enableValidation(validationConfig);