/* Imports */
import { renderFriend, renderMushroom } from './render-utils.js';
import { getRandomItem } from './utils.js';

/* Get DOM Elements */
const messageSection = document.getElementById('message-section');
const mushroomContainer = document.getElementById('mushroom-container');
const huntMushroomsButton = document.getElementById('hunt-mushrooms-button');
const addFriendForm = document.getElementById('add-friend-form');
const sayGoodbyeButton = document.getElementById('say-goodbye-button');
const friendsSection = document.getElementById('friends-section');

/* State */
let message = '';
//mushroom array
let mushrooms = [{ type: 'porcini' }, { type: 'chanterelle' }, { type: 'morel' }];
// friends array
let friends = [
    { name: 'Wilbur', satisfied: 0 },
    { name: 'Miss Piggy', satisfied: 0 },
    { name: 'Pumbaa', satisfied: 0 },
];

// static types and probabilities
const porcini = {
    type: 'porcini',
};
const chanterelle = {
    type: 'chanterelle',
};
const morel = {
    type: 'morel',
};

const amountFound = [0, 0, 0, 0, 1, 1, 1, 2];
const mushroomTypeFound = [porcini, porcini, porcini, morel, morel, chanterelle];

/* Events */

const foundMessage = ['No mushrooms found!', 'You found 1 mushroom', 'You found 2 mushrooms'];

huntMushroomsButton.addEventListener('click', () => {
    const found = getRandomItem(amountFound);

    for (let i = 0; i < found; i++) {
        const mushroomType = getRandomItem(mushroomTypeFound);
        const mushroom = {
            type: mushroomType.type,
        };
        // > add the new mushroom to the mushrooms state
        mushrooms.push(mushroom);
    }

    message = foundMessage[found];

    displayMessage();
    displayMushrooms();
});

addFriendForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(addFriendForm);

    // > create a new friend, with a "name" property that
    const friend = {
        // is populated from `formData.get('name')` and a
        name: formData.get('name'),
        // "satisfied" property with an initial value of 0
        satisfied: 0,
    };
    // > add the new friend to the friends array
    friends.push(friend);
    // > set the message state to let the user know
    // they invited a new friend to the festival, include the friend's
    // name in the message
    message = `${friend.name} has joined the Mushroom Festival!`;

    addFriendForm.reset();

    // > call the display functions that need to re-display
    displayFriends();
});

sayGoodbyeButton.addEventListener('click', () => {
    const stillHungry = [];
    for (const friend of friends) {
        // > if the friend is not fully satisfied, push
        // them into the stillHungry array
        if (friend.satisfied < 3) {
            stillHungry.push(friend);
        }
    }
    friends = stillHungry;
    displayFriends();
});

/* Display Functions */
function displayMessage() {
    messageSection.textContent = message;
}

function displayMushrooms() {
    mushroomContainer.innerHTML = '';

    // > loop the mushrooms
    for (const mushroom of mushrooms) {
        // create a mushroom element using the renderMushroom function
        const mushroomEl = renderMushroom(mushroom);
        // append it to the container
        mushroomContainer.append(mushroomEl);
    }
}

function displayFriends() {
    friendsSection.innerHTML = '';

    for (const friend of friends) {
        const friendEl = renderFriend(friend);

        friendEl.addEventListener('click', () => {
            // > handle the three possible outcomes:
            // 1. No mushrooms, set a message to go hunt for more
            if (!mushrooms.length) {
                message = 'Oh no! No mushrooms, better go find more..!';
                // 2. Friend is already fully satisfied (3), set a message to pick another friend
            } else if (friend.satisfied === 3) {
                message = `Looks like ${friend.name} is already full! Feed someone else`;
            }
            displayMessage();
            displayMushrooms();
            displayFriends();
        });

        friendsSection.append(friendEl);
    }
}

displayMessage();
displayMushrooms();
displayFriends();

//adding small note for late deployment of Netlify... Sorrrrryyyyyy
