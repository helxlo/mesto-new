import { openModal } from "./modal.js"
import { popupFullScreen, subtitleFullScreen, picFullScreen } from "../index.js";

const elementTemplate = document.querySelector('#element').content;

function createCard(name, link) {
    const card = elementTemplate.querySelector('.element').cloneNode(true);
    card.querySelector('.element__title').textContent = name;
    const cardPic = card.querySelector('.element__pic')
    cardPic.src = link;
    cardPic.alt = name;

    const like = card.querySelector('.element__like');
    like.addEventListener('click', () => like.classList.toggle('element__like_active'));

    const trash = card.querySelector('.element__trash');
    trash.addEventListener('click', () => trash.closest('.element').remove())

    const pic = card.querySelector('.element__pic');
    pic.addEventListener('click', function () {
        openModal(popupFullScreen);
        picFullScreen.src = link;
        subtitleFullScreen.textContent = name
        picFullScreen.alt = name
    });

    return card
}

export { createCard }
