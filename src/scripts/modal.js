// Функция отрытия попапа
function openModal(modal) {
  modal.classList.add('popup_is-opened');
  modal.addEventListener('click', сlickHandler);
  document.addEventListener('keydown', keyHandler);
}
// Функция закрытия попапа
function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  modal.removeEventListener('click', сlickHandler);
  document.removeEventListener('keydown', keyHandler);
}
// Закрытие попапа по клавише Esc
function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector(".popup_is-opened");
    closeModal(modal);
  }
}
// Закрытие попапа по клику на крестик и оверлей
function сlickHandler(evt) {
  const modal = document.querySelector(".popup_is-opened");
  if ( evt.currentTarget === evt.target || evt.target.classList.contains('popup__close') ) {
    closeModal(modal);
  }
}
// Экспорт функций закрытия и открытя попапа
export { openModal, closeModal };