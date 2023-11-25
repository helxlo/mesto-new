function openModal(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc);
}

function closeModal(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEsc);
}

function handleEsc(evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened')
    closeModal(openPopup)
  }
}

export { openModal, closeModal, handleEsc }