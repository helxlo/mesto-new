import '../pages/index.css';
import { getProfileInfo, getInitialCards, patchProfileInfo, postNewCard, patchProfileAvatar, deleteCard } from './api.js'
import { createCard, popupAreYouSure, deleteCurrentCard, clickOnLike } from './card.js'
import { openModal, closeModal } from './modal.js'
import { enableValidation, clearValidation } from './validate.js'

export const handleCatch = (err) => {
  console.log(err)
}

const popups = document.querySelectorAll('.popup')

export const profileName = document.querySelector('.profile__name') //имя
export const profileDescription = document.querySelector('.profile__description') //деятельность
export const profilePic = document.querySelector('.profile__pic-zone') //аватарка
export const picAvatar = document.querySelector('.profile__pic')
export const profileInfo = document.querySelector('.profile__info')

const popupProfileEditButton = document.querySelector('.profile__editbutton') //кнопка редактирования
export const popupEdit = document.querySelector('.popup_type_edit') //попап редактирования
const formProfileElement = document.forms["edit-form"] //форма попапа редактирования
export const nameInput = formProfileElement.querySelector('.popup__input_type_name') //строка ввода имени
export const descriptionInput = formProfileElement.querySelector('.popup__input_type_job') //строка ввода деятельности
const editSaveButton = formProfileElement.querySelector('.popup__savebutton')

export const cardsSection = document.querySelector('.elements') //таблица с карточками

const popupProfileAddButton = document.querySelector('.profile__addbutton') //кнопка добавления
const popupAdd = document.querySelector('.popup_type_add') //попап добавления карточки
const popupAddForm = document.forms["add-form"] //форма попапа добавления карточки
const titleInput = popupAddForm.querySelector('.popup__input_type_title') //строка ввода описания фото
const linkInput = popupAddForm.querySelector('.popup__input_type_link') //строка ввода ссылки на фото
const addSaveButton = popupAddForm.querySelector('.popup__savebutton')

export const popupFullScreen = document.querySelector('.popup_type_fullscreen') //попап фуллскрин
export const picFullScreen = document.querySelector('.popup__fullscreen-pic') //попап картинки фуллскрина
export const subtitleFullScreen = document.querySelector('.popup__fullscreen-subtitle') //попап описания фуллскрина

const popupAvatar = document.querySelector('.popup_type_avatar')
const popupAvatarForm = document.forms["avatar-form"]
const avatarInput = popupAvatarForm.querySelector('.popup__input_type_avatar')
const avatarSaveButton = popupAvatarForm.querySelector('.popup__savebutton')

export const popupDeleteForm = document.forms["delete-form"]
//константы-^

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearValidation(formProfileElement, clearConfig)

  openModal(popupEdit)
}


//функция открытия попапа с редактированием

function submitEditForm(evt) {
  evt.preventDefault()

  renderLoading(true, editSaveButton)

  patchProfileInfo(nameInput.value, descriptionInput.value)
    .then((res) => {
      profileName.textContent = res.name
      profileDescription.textContent = res.about
      closeModal(popupEdit)
    })
    .catch(handleCatch)
    .finally(() => {
      renderLoading(false, editSaveButton)
    })
}
//функция редактирования и закрытия попапа

function submitAddForm(evt) {
  evt.preventDefault();

  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  renderLoading(true, addSaveButton)

  postNewCard(titleValue, linkValue)
    .then(item => {
      const newCard = createCard(item, deleteCurrentCard, clickOnLike, openFullScreen);
      cardsSection.prepend(newCard);
      closeModal(popupAdd);
    })
    .catch(handleCatch)
    .finally(() => {
      renderLoading(false, addSaveButton)
    })
  popupAddForm.reset();

}; //функция создания новой карточки 

function submitNewAvatar(evt) {
  evt.preventDefault()
  const newAvatar = avatarInput.value

  renderLoading(true, avatarSaveButton)

  patchProfileAvatar(newAvatar)
    .then(() => {
      picAvatar.style.background = `url(${newAvatar})`
      closeModal(popupAvatar)
      popupAvatarForm.reset()
    })
    .catch(handleCatch)
    .finally(() => {
      renderLoading(false, avatarSaveButton)
    })

}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closeModal(popup)
    }
    if (evt.target.classList.contains('popup__closebutton')) {
      closeModal(popup)
    }
  })
})
//функция закрытия поп-апов

function renderLoading(isLoading, saveButton) {
  if (isLoading) {
    saveButton.textContent = "Сохранение..."
  }
  else {
    saveButton.textContent = "Сохранить"
  }
}
//функция изменения надписи при загрузке

export function getCards() {
  Promise.all([
    getProfileInfo()
      .then((result) => {
        profileName.textContent = result.name
        profileDescription.textContent = result.about
        picAvatar.style.background = `url(${result.avatar})`
        profileInfo.dataset.id = result._id
      })
      .catch(handleCatch),

    getInitialCards()
      .then((result) => {
        const arr = Array.from(result)
        arr.forEach((item) => {
          const cardItem = createCard(item, deleteCurrentCard, clickOnLike, openFullScreen)
          cardsSection.append(cardItem)
        })
      })
      .catch(handleCatch)
  ])
}
getCards()
//функция вывода карточек на страничку

//функции --^
popupAvatarForm.addEventListener('submit', submitNewAvatar)

function submitDeleteForm(evt) {
  evt.preventDefault()

  const cardId = popupDeleteForm.dataset.id
  const card = document.querySelector(`[data-id="${cardId}"]`)

  deleteCard(cardId)
    .then(() => {
      card.remove()
      closeModal(popupAreYouSure)
    })
    .catch(handleCatch)
}

popupDeleteForm.addEventListener('submit', submitDeleteForm)

popupProfileEditButton.addEventListener('click', openProfilePopup);
formProfileElement.addEventListener('submit', submitEditForm);

popupProfileAddButton.addEventListener('click', () => {
  openModal(popupAdd)
  clearValidation(popupAddForm, clearConfig)
});
popupAddForm.addEventListener('submit', submitAddForm);

profilePic.addEventListener('click', () => {
  openModal(popupAvatar)
  clearValidation(popupAvatarForm, clearConfig)
})

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

const clearConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_disabled',
  inputErrorClass: 'popup__input_type_error',
}
//обработчики событий ---^

export const openFullScreen = (link, name) => {
  openModal(popupFullScreen);
  picFullScreen.src = link;
  subtitleFullScreen.textContent = name
  picFullScreen.alt = name
}