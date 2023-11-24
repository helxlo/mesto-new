import './pages/index.css';
import { initialCards } from './scripts/cards.js'
import { createCard } from './scripts/card.js'
import { openModal, closeModal, clickOverlay } from './scripts/modal.js'

const title = document.querySelector('.profile__name') //имя
const subtitle = document.querySelector('.profile__description') //деятельность

const popupProfileEditButton = document.querySelector('.profile__editbutton') //кнопка редактирования
const popupEdit = document.querySelector('.popup_type_edit') //попап редактирования
const formProfileElement = document.querySelector('.popup__form_type_edit') //форма попапа редактирования
const nameInput = formProfileElement.querySelector('.popup__input_type_name') //строка ввода имени
const jobInput = formProfileElement.querySelector('.popup__input_type_job') //строка ввода деятельности
const popupCloseEditButton = document.querySelector('.popup__closebutton_type_edit') //кнопка закрытия окна редактирования

const cardsSection = document.querySelector('.elements'); //таблица с карточками

const popupProfileAddButton = document.querySelector('.profile__addbutton') //кнопка добавления
const popupAdd = document.querySelector('.popup_type_add') //попап добавления карточки
const popupAddForm = document.querySelector('.popup__form_type_add'); //форма попапа добавления карточки
const titleInput = popupAddForm.querySelector('.popup__input_type_title'); //строка ввода описания фото
const linkInput = popupAddForm.querySelector('.popup__input_type_link'); //строка ввода ссылки на фото
const popupCloseAddButton = document.querySelector('.popup__closebutton_type_add') //кнопка закрытия окна добавления карточки

export const popupFullScreen = document.querySelector('.popup_type_fullscreen') //попап фуллскрин
export const picFullScreen = document.querySelector('.popup__fullscreen-pic'); //попап картинки фуллскрина
export const subtitleFullScreen = document.querySelector('.popup__fullscreen-subtitle'); //попап описания фуллскрина
const popupCloseFullScreenButton = document.querySelector('.popup__closebutton_type_fullscreen') //кнопка закрытия окна фуллскрина

//константы-^

initialCards.forEach((element) => {
  const cardItem = createCard(element.name, element.link);
  cardsSection.append(cardItem);
}) //функция добавления карточек из массива на страничку

function editFormButton() {
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;

  openModal(popupEdit)
} //функция открытия попапа с редактированием

function editFormSubmit(evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;

  closeModal(popupEdit);
} //функция редактирования и закрытия попапа

function addFormSubmit(evt) {
  evt.preventDefault();

  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  const newCard = createCard(titleValue, linkValue);
  cardsSection.prepend(newCard);
  closeModal(popupAdd);
  popupAddForm.reset();
}; //функция создания новой карточки

//функции --^

popupProfileEditButton.addEventListener('click', editFormButton);
formProfileElement.addEventListener('submit', editFormSubmit);
popupCloseEditButton.addEventListener('click', () => closeModal(popupEdit));

popupProfileAddButton.addEventListener('click', () => openModal(popupAdd));
popupAddForm.addEventListener('submit', addFormSubmit);
popupCloseAddButton.addEventListener('click', () => closeModal(popupAdd));

popupCloseFullScreenButton.addEventListener('click', () => closeModal(popupFullScreen));

popupFullScreen.addEventListener('click', clickOverlay);
popupEdit.addEventListener('click', clickOverlay);
popupAdd.addEventListener('click', clickOverlay);

//обработчики событий ---^