import { openModal, closeModal } from "./modal.js"
import { popupFullScreen, subtitleFullScreen, picFullScreen, popupDeleteForm } from "../pages/index.js";
import { deleteCard, putLikeOnCard, deleteLikeOnCard } from "./api.js";

const popupAreYouSure = document.querySelector('.popup_type_areyousure')

function createCard(name, link, owner, id, likes) {
    const elementTemplate = document.querySelector('#element').content;
    const card = elementTemplate.querySelector('.element').cloneNode(true);
    card.querySelector('.element__title').textContent = name;
    const cardPic = card.querySelector('.element__pic')

    cardPic.src = link;
    cardPic.alt = name;

    const likesNumber = card.querySelector('.element__counter')
    const like = card.querySelector('.element__like');

    const isAlreadyLiked = likes.some(
        (like) => like._id === 'ebd0e184bdeb8eaf75866e3f'
    )

    if (isAlreadyLiked) {
        like.classList.add('element__like_active')
    }

    like.addEventListener('click', () => {
        if (like.classList.contains('element__like_active')) {
            deleteLikeOnCard(id)
                .then((card) => {
                    likesNumber.textContent = card.likes.length
                    like.classList.remove('element__like_active')
                })
        } else {
            putLikeOnCard(id)
                .then((card) => {
                    likesNumber.textContent = card.likes.length
                    like.classList.add('element__like_active')
                })
        }
    })

    likesNumber.textContent = likes.length

    const trash = card.querySelector('.element__trash');

    if (owner._id === 'ebd0e184bdeb8eaf75866e3f') {
        trash.style.visibility = "visible";
        popupDeleteForm.addEventListener('submit', (evt) => {
            evt.preventDefault()
            deleteCard(id)
            card.remove(id)
            closeModal(popupAreYouSure)
        }
        )
    }

    trash.addEventListener('click', () => openModal(popupAreYouSure))

    cardPic.addEventListener('click', function () {
        openModal(popupFullScreen);
        picFullScreen.src = link;
        subtitleFullScreen.textContent = name
        picFullScreen.alt = name
    });

    return card
}

export { createCard }
