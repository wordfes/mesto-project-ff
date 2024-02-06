import './pages/index.css';
import * as api from "./scripts/api.js";
import { createCard, handleDeleteCard, like } from './scripts/card.js'
import { openModal, closeModal } from './scripts/modal.js'
import { enableValidation, clearValidation } from './scripts/validation.js'

// Вывести карточки на страницу
const cardsContainer = document.querySelector(".places__list");
const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
let profileId = null;

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profileDetails, cards]) => {
    profileId = profileDetails._id;
    profileImage.style.backgroundImage = 'url(' + profileDetails.avatar + ')'; 
    profileTitle.textContent = profileDetails.name;
    profileJob.textContent = profileDetails.about;

    cards.forEach((card) => {
      cardsContainer.append(createCard(card, handleDeleteCard, like, showImage, showDeletePopup, profileId));
    });
  })
  .catch((error) =>
    console.error("Ошибка получения данных по карточкам и профилю", error)
  );
// Функция открытия попапа с картинкой
const popupImage = document.querySelector(".popup_type_image");
function showImage(card) {
  popupImage.querySelector(".popup__caption").textContent = card.name;
  popupImage.querySelector(".popup__image").src = card.link;
  popupImage.querySelector(".popup__image").alt = card.name;
  openModal(popupImage);
}
// Открытие формы редактирования
const buttonEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
buttonEdit.addEventListener('click', function () {
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');

  nameInput.value = document.querySelector(".profile__title").textContent;
  jobInput.value = document.querySelector(".profile__description").textContent;
  
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEdit);
});
// Открытие формы аватара
const buttonEditAvatar = document.querySelector(".profile__avatar-button");
const popupEditAvatar = document.querySelector(".popup_type_avatar");
buttonEditAvatar.addEventListener('click', function () {
  clearValidation(formEditAvatar, validationConfig);
  openModal(popupEditAvatar);
});
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
// Отправка формы редактирования
const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");
function submitFormEditProfile(evt) {
  function makeRequest() {
    return api.changeProfileInfo(nameInput.value, jobInput.value).then((result) => {
      profileTitle.textContent = result.name;
      profileJob.textContent = result.about;
      closeModal(popupEdit);
    });
  }
  handleSubmit(makeRequest, evt);
}
formEditProfile.addEventListener('submit', submitFormEditProfile);
// Отправка формы редактирования аватара
const formEditAvatar = document.forms["edit-avatar"];
const avatarInput = formEditAvatar.querySelector(".popup__input_type_avatar");
function submitFormEditAvatar(evt) {
  function makeRequest() {
    return api.setAvatar(avatarInput.value).then((result) => {
      profileImage.style.backgroundImage = 'url(' + result.avatar + ')';
      closeModal(popupEditAvatar);
    });
  }
  handleSubmit(makeRequest, evt);
}
formEditAvatar.addEventListener('submit', submitFormEditAvatar);
// Форма добавления карточки
const buttonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
buttonAdd.addEventListener('click', function () {
  clearValidation(formNewPlace, validationConfig);
  openModal(popupAdd);
});
// Отправка формы добавления карточки
const formNewPlace = document.forms["new-place"] ;
const placeInput = formNewPlace.querySelector(".popup__input_type_card-name");
const urlInput = formNewPlace.querySelector(".popup__input_type_url");
function submitFormNewPlace(evt) {
  function makeRequest() {
    return api.addCard(placeInput.value, urlInput.value).then((card) => {
      cardsContainer.prepend(
        createCard(card, handleDeleteCard, like, showImage, showDeletePopup, profileId)
      );
      formNewPlace.reset();
      closeModal(popupAdd);
    });
  }
  handleSubmit(makeRequest, evt)
}
formNewPlace.addEventListener('submit', submitFormNewPlace);
// Функция открытия попапа с подтверждением удаления карточки
const popupDeleteCard = document.querySelector(".popup_type_delete-card");
function showDeletePopup(currentCard) {
  popupDeleteCard.querySelector(".popup__button").dataset.cardId = currentCard.dataset.cardId;
  openModal(popupDeleteCard);
}
// Отправка формы удаления карточки
const formDeletePlace = document.forms["delete-place"];
function submitFormDeletePlace() {
  const cartID = formDeletePlace.querySelector(".popup__button").dataset.cardId;
  handleDeleteCard(cartID);
  closeModal(popupDeleteCard);
}
formDeletePlace.addEventListener('submit', submitFormDeletePlace);
// Валидация форм
export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
enableValidation(validationConfig);