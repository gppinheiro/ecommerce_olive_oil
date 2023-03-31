import {Profile} from './modules.js';

const profile = new Profile();

window.addEventListener("load", (event) => {
    profile.addEventHandlers();
});