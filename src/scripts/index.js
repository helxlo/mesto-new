import '../pages/index.css';
import { getProfileInfo, getInitialCards, patchProfileInfo, postNewCard, patchProfileAvatar } from './api.js'
import { createCard } from './card.js'
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

const popupProfileEditButton = document.querySelector('.profile__editbutton') //кнопка редактирования
export const popupEdit = document.querySelector('.popup_type_edit') //попап редактирования
const formProfileElement = document.forms["edit-form"] //форма попапа редактирования
export const nameInput = formProfileElement.querySelector('.popup__input_type_name') //строка ввода имени
export const descriptionInput = formProfileElement.querySelector('.popup__input_type_job') //строка ввода деятельности

const saveButtons = document.querySelectorAll('.popup__savebutton')

export const cardsSection = document.querySelector('.elements') //таблица с карточками

const popupProfileAddButton = document.querySelector('.profile__addbutton') //кнопка добавления
const popupAdd = document.querySelector('.popup_type_add') //попап добавления карточки
const popupAddForm = document.forms["add-form"] //форма попапа добавления карточки
const titleInput = popupAddForm.querySelector('.popup__input_type_title') //строка ввода описания фото
const linkInput = popupAddForm.querySelector('.popup__input_type_link') //строка ввода ссылки на фото

export const popupFullScreen = document.querySelector('.popup_type_fullscreen') //попап фуллскрин
export const picFullScreen = document.querySelector('.popup__fullscreen-pic') //попап картинки фуллскрина
export const subtitleFullScreen = document.querySelector('.popup__fullscreen-subtitle') //попап описания фуллскрина

const popupAvatar = document.querySelector('.popup_type_avatar')
const popupAvatarForm = document.forms["avatar-form"]
const avatarInput = popupAvatarForm.querySelector('.popup__input_type_avatar')

export const popupDeleteForm = document.forms["delete-form"]
//константы-^

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearValidation(formProfileElement, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__savebutton',
    inactiveButtonClass: 'popup__savebutton_disabled',
    inputErrorClass: 'popup__input_type_error',
  })

  openModal(popupEdit)
}
//функция открытия попапа с редактированием

function submitEditForm(evt) {
  evt.preventDefault()

  renderLoading(true)

  patchProfileInfo(nameInput.value, descriptionInput.value)
    .then(() => {
      profileName.textContent = nameInput.value
      profileDescription.textContent = descriptionInput.value
      closeModal(popupEdit)
    })
    .catch(handleCatch)
    .finally(() => {
      renderLoading(false)
    })
}
//функция редактирования и закрытия попапа

function submitAddForm(evt) {
  evt.preventDefault();

  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  renderLoading(true)

  postNewCard(titleValue, linkValue)
    .then(item => {
      const newCard = createCard(item);
      cardsSection.prepend(newCard);
      closeModal(popupAdd);
    })
    .catch(handleCatch)
    .finally(() => {
      renderLoading(false)
    })
  popupAddForm.reset();

}; //функция создания новой карточки 

function submitNewAvatar(evt) {
  evt.preventDefault()
  const newAvatar = avatarInput.value

  renderLoading(true)

  patchProfileAvatar(newAvatar)
    .then(() => {
      picAvatar.style.background = `url(${newAvatar})`
      closeModal(popupAvatar)
      popupAvatarForm.reset()
    })
    .catch(handleCatch)
    .finally(() => {
      renderLoading(false)
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

function renderLoading(isLoading) {
  saveButtons.forEach((item) => {
    if (isLoading) {
      item.textContent = "Сохранение..."
    }
    else {
      item.textContent = "Сохранить"
    }
  })
}
//функция изменения надписи при загрузке

function getProfileData() {
  getProfileInfo()
    .then((result) => {
      profileName.textContent = result.name
      profileDescription.textContent = result.about
      picAvatar.style.background = `url(${result.avatar})`
    })
    .catch(handleCatch)
}
getProfileData()

//

function getCards() {
  Promise.all([getProfileData(), getInitialCards()])
  getInitialCards()
    .then((result) => {
      const arr = Array.from(result)
      arr.forEach((item) => {
        const cardItem = createCard(item)
        cardsSection.append(cardItem)
      })
    })
    .catch(handleCatch)
}
getCards()
//функция вывода карточек на страничку

//функции --^

popupAvatarForm.addEventListener('submit', submitNewAvatar)

popupProfileEditButton.addEventListener('click', openProfilePopup);
formProfileElement.addEventListener('submit', submitEditForm);

popupProfileAddButton.addEventListener('click', () => {
  openModal(popupAdd)
  clearValidation(popupAddForm, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__savebutton',
    inactiveButtonClass: 'popup__savebutton_disabled',
    inputErrorClass: 'popup__input_type_error',
  })
});
popupAddForm.addEventListener('submit', submitAddForm);

profilePic.addEventListener('click', () => {
  openModal(popupAvatar)
  clearValidation(popupAvatarForm, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__savebutton',
    inactiveButtonClass: 'popup__savebutton_disabled',
    inputErrorClass: 'popup__input_type_error',
  })
})

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

//обработчики событий ---^