function openModal(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', clickEsc);
}

function closeModal(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', clickEsc);
}


function clickEsc(evt) {
  const openPopup = document.querySelector('.popup_opened')
  if (evt.key === 'Escape') {
    closeModal(openPopup)
  }
}

function clickOverlay(evt) {
  const EventCurrentTarget = evt.currentTarget
  const EventTarget = evt.target
  if (EventTarget.classList.contains('popup')) {
    closeModal(EventCurrentTarget);
  }
}

export { openModal, closeModal, clickEsc, clickOverlay }