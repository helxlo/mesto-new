import { openModal } from "./modal.js"
import { popupDeleteForm, handleCatch, profileInfo } from "./index.js";
import { putLikeOnCard, deleteLikeOnCard } from "./api.js";

export const popupAreYouSure = document.querySelector('.popup_type_areyousure')

function createCard(item, deleteCurrentCard, clickOnLike, openFullScreen) {
    const elementTemplate = document.querySelector('#element').content;
    const card = elementTemplate.querySelector('.element').cloneNode(true);

    const name = item.name
    const link = item.link
    const ownerId = item.owner._id
    const cardId = item._id
    const likes = item.likes
    const myId = profileInfo.dataset.id

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
    like.addEventListener('click', () => clickOnLike(cardId, like, likesNumber))
    likesNumber.textContent = likes.length

    const trash = card.querySelector('.element__trash');

    if (ownerId === myId) {
        trash.style.visibility = "visible";
    }

    trash.addEventListener('click', () =>
        deleteCurrentCard(cardId, card)
    )

    cardPic.addEventListener('click', () => openFullScreen(link, name));

    return card
}

export const deleteCurrentCard = (id, card) => {
    openModal(popupAreYouSure)
    popupDeleteForm.dataset.id = id
    card.dataset.id = id
}

export function clickOnLike(cardId, like, likesNumber) {
    if (like.classList.contains('element__like_active')) {
        deleteLikeOnCard(cardId)
            .then((card) => {
                likesNumber.textContent = card.likes.length
                like.classList.remove('element__like_active')
            })
            .catch(handleCatch)
    } else {
        putLikeOnCard(cardId)
            .then((card) => {
                likesNumber.textContent = card.likes.length
                like.classList.add('element__like_active')
            })
            .catch(handleCatch)
    }
}


export { createCard }
