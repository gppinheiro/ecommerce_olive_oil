const menubutton = document.querySelector(".menu-button");
const navlinks = document.querySelector(".nav__links");

menubutton.addEventListener("click", mobileMenu);

function mobileMenu() {
    menubutton.classList.toggle("active");
    navlinks.classList.toggle("active");
}