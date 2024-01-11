// Функция отрытия попапа
function openModal(Modal) {
  Modal.classList.add('popup_is-opened');
  Modal.addEventListener('click', сlickHandler);
  document.addEventListener('keydown', keyHandler);
}
// Функция закрытия попапа
function closeModal(Modal) {
  Modal.classList.remove('popup_is-opened');
  Modal.removeEventListener('click', сlickHandler);
  document.removeEventListener('keydown', keyHandler);
}
// Закрытие попапа по клавише Esc
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const Modal = document.querySelector(".popup_is-opened");
    closeModal(Modal);
  }
}
// Закрытие попапа по клику на крестик и оверлей
function сlickHandler(evt) {
  const Modal = document.querySelector(".popup_is-opened");
  const popupClose = Modal.querySelector(".popup__close");
  if ( evt.currentTarget === evt.target || popupClose === evt.target ) {
    closeModal(Modal);
  }
}
// Экспорт функций закрытия и открытя попапа
export { openModal, closeModal };