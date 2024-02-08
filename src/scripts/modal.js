// Функция отрытия попапа
export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  modal.addEventListener('click', handleCloseByClick);
  document.addEventListener('keydown', handleCloseByEsc);
}
// Функция закрытия попапа
export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');
  modal.removeEventListener('click', handleCloseByClick);
  document.removeEventListener('keydown', handleCloseByEsc);
}
// Закрытие попапа по клавише Esc
function handleCloseByEsc(evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector(".popup_is-opened");
    closeModal(modal);
  }
}
// Закрытие попапа по клику на крестик и оверлей
function handleCloseByClick(evt) {
  const modal = document.querySelector(".popup_is-opened");
  if ( evt.currentTarget === evt.target || evt.target.classList.contains('popup__close') ) {
    closeModal(modal);
  }
}