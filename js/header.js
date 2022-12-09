const menubutton = document.querySelector(".menu-button");
const navlinks = document.querySelector(".nav__links");

menubutton.addEventListener("click", mobileMenu);

function mobileMenu() {
    menubutton.classList.toggle("active");
    navlinks.classList.toggle("active");
}

function showHeader() {
    return `<header id="nav-header">
        <div class="menu_nav">
            <ul class="nav__links">
                <li><a href="#"><i class="bi-house icon"></i> Início</a></li>
                <li><a href="#"><i class="bi-bag icon"></i> Loja</a></li>
            </ul>
            <!-- <div class="menu-button">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </div> -->
        </div>

        <div class="logo">
            <a href=""><img src="img/logo.png" alt="logo" width="150"></a>
        </div>

        <div class="main_nav">
            <ul class="nav__links">
                <li><a href="#"><i class="bi-basket3 icon"></i></a></li>
                <li><a href="#"><i class="bi-person icon"></i></a></li>
            </ul>
        </div>
    </header>`;
}