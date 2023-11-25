import './pages/index.css';
import { initialCards } from './scripts/cards.js'
import { createCard } from './scripts/card.js'
import { openModal, closeModal } from './scripts/modal.js'

const popups = document.querySelectorAll('.popup')

const title = document.querySelector('.profile__name') //имя
const subtitle = document.querySelector('.profile__description') //деятельность

const popupProfileEditButton = document.querySelector('.profile__editbutton') //кнопка редактирования
const popupEdit = document.querySelector('.popup_type_edit') //попап редактирования
const formProfileElement = document.forms["edit-form"] //форма попапа редактирования
const nameInput = formProfileElement.querySelector('.popup__input_type_name') //строка ввода имени
const jobInput = formProfileElement.querySelector('.popup__input_type_job') //строка ввода деятельности

const cardsSection = document.querySelector('.elements') //таблица с карточками

const popupProfileAddButton = document.querySelector('.profile__addbutton') //кнопка добавления
const popupAdd = document.querySelector('.popup_type_add') //попап добавления карточки
const popupAddForm = document.forms["add-form"] //форма попапа добавления карточки
const titleInput = popupAddForm.querySelector('.popup__input_type_title') //строка ввода описания фото
const linkInput = popupAddForm.querySelector('.popup__input_type_link') //строка ввода ссылки на фото

export const popupFullScreen = document.querySelector('.popup_type_fullscreen') //попап фуллскрин
export const picFullScreen = document.querySelector('.popup__fullscreen-pic') //попап картинки фуллскрина
export const subtitleFullScreen = document.querySelector('.popup__fullscreen-subtitle') //попап описания фуллскрина

//константы-^

initialCards.forEach((element) => {
  const cardItem = createCard(element.name, element.link);
  cardsSection.append(cardItem);
}) //функция добавления карточек из массива на страничку

function openFormButton() {
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;

  openModal(popupEdit)
} //функция открытия попапа с редактированием

function submitEditForm(evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;

  closeModal(popupEdit);
} //функция редактирования и закрытия попапа

function submitAddForm(evt) {
  evt.preventDefault();

  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  const newCard = createCard(titleValue, linkValue);
  cardsSection.prepend(newCard);
  closeModal(popupAdd);
  popupAddForm.reset();
}; //функция создания новой карточки

//функции --^

popupProfileEditButton.addEventListener('click', openFormButton);
formProfileElement.addEventListener('submit', submitEditForm);

popupProfileAddButton.addEventListener('click', () => openModal(popupAdd));
popupAddForm.addEventListener('submit', submitAddForm);

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

//обработчики событий ---^