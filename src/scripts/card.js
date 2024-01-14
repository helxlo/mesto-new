import { openModal, closeModal } from "./modal.js"
import { popupFullScreen, subtitleFullScreen, picFullScreen, popupDeleteForm, handleCatch } from "./index.js";
import { deleteCard, putLikeOnCard, deleteLikeOnCard } from "./api.js";

const popupAreYouSure = document.querySelector('.popup_type_areyousure')

function createCard(item) {
    const elementTemplate = document.querySelector('#element').content;
    const card = elementTemplate.querySelector('.element').cloneNode(true);

    const name = item.name
    const link = item.link
    const ownerId = item.owner._id
    const userId = item._id
    const likes = item.likes
    const myId = 'ebd0e184bdeb8eaf75866e3f'

    card.querySelector('.element__title').textContent = name;
    const cardPic = card.querySelector('.element__pic')

    cardPic.src = link;
    cardPic.alt = name;

    const like = card.querySelector('.element__like');

    const isAlreadyLiked = likes.some(
        (like) => like._id === myId
    )

    if (isAlreadyLiked) {
        like.classList.add('element__like_active')
    }

    const likesNumber = card.querySelector('.element__counter')
    like.addEventListener('click', () => clickOnLike(userId, like, likesNumber))
    likesNumber.textContent = likes.length

    const trash = card.querySelector('.element__trash');

    if (ownerId === myId) {
        trash.style.visibility = "visible";
        trash.addEventListener('click', () => {
            deleteCurrentCard(userId, card)
        })
    }

    cardPic.addEventListener('click', () => openFullScreen(link, name));

    return card
}

function openFullScreen(link, name) {
    openModal(popupFullScreen);
    picFullScreen.src = link;
    subtitleFullScreen.textContent = name
    picFullScreen.alt = name
}


function deleteCurrentCard(id, card) {
    openModal(popupAreYouSure)
    popupDeleteForm.dataset.id = id

    popupDeleteForm.addEventListener('click', (evt) => {
        evt.preventDefault()
        deleteCard(id)
            .then(() => {
                card.remove()
                closeModal(popupAreYouSure)
            })
            .catch(handleCatch)
    })

}

function clickOnLike(userId, like, likesNumber) {
    if (like.classList.contains('element__like_active')) {
        deleteLikeOnCard(userId)
            .then((card) => {
                likesNumber.textContent = card.likes.length
                like.classList.remove('element__like_active')
            })
            .catch(handleCatch)
    } else {
        putLikeOnCard(userId)
            .then((card) => {
                likesNumber.textContent = card.likes.length
                like.classList.add('element__like_active')
            })
            .catch(handleCatch)
    }
}


export { createCard }
