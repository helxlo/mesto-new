import './pages/index.css';
import { getProfileInfo, getInitialCards, patchProfileInfo, postNewCard, patchProfileAvatar } from './scripts/api.js'
import { createCard } from './scripts/card.js'
import { openModal, closeModal } from './scripts/modal.js'
import { enableValidation } from './scripts/validate.js'

const popups = document.querySelectorAll('.popup')

export const title = document.querySelector('.profile__name') //имя
export const subtitle = document.querySelector('.profile__description') //деятельность
export const pic = document.querySelector('.profile__pic-zone') //аватарка
export const picAvatar = document.querySelector('.profile__pic')

const popupProfileEditButton = document.querySelector('.profile__editbutton') //кнопка редактирования
export const popupEdit = document.querySelector('.popup_type_edit') //попап редактирования
const formProfileElement = document.forms["edit-form"] //форма попапа редактирования
export const nameInput = formProfileElement.querySelector('.popup__input_type_name') //строка ввода имени
export const jobInput = formProfileElement.querySelector('.popup__input_type_job') //строка ввода деятельности

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
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;

  openModal(popupEdit)
}
//функция открытия попапа с редактированием

function submitEditForm(evt) {
  evt.preventDefault();

  renderLoading(true)

  title.textContent = nameInput.value
  subtitle.textContent = jobInput.value

  patchProfileInfo(nameInput.value, jobInput.value)
    .then(() => {
      closeModal(popupEdit)
    })
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
      const newCard = createCard(item.name, item.link, item.owner, item._id, item.likes);
      cardsSection.prepend(newCard);
    })
    .finally(() => {
      renderLoading(false)
    })

  closeModal(popupAdd);
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
      title.textContent = result.name
      subtitle.textContent = result.about
      picAvatar.style.background = `url(${result.avatar})`
    })
}
getProfileData()

//

function getCards() {
  getInitialCards()
    .then((result) => {
      const arr = Array.from(result)
      arr.forEach((item) => {
        const cardItem = createCard(item.name, item.link, item.owner, item._id, item.likes)
        cardsSection.append(cardItem)
      })
    })
}
getCards()
//функция вывода карточек на страничку

//функции --^

popupAvatarForm.addEventListener('submit', submitNewAvatar)

popupProfileEditButton.addEventListener('click', openProfilePopup);
formProfileElement.addEventListener('submit', submitEditForm);

popupProfileAddButton.addEventListener('click', () => openModal(popupAdd));
popupAddForm.addEventListener('submit', submitAddForm);

pic.addEventListener('click', () => {
  openModal(popupAvatar)
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