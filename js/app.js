/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/**
 * Define Global Variables
 * 
//  */

const navMenu = document.querySelector('#navbar__list');
const navSections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// build the nav
function buildNav() {
    const fragment = document.createDocumentFragment();

    navSections.forEach((navSection) => {
        const liTag = document.createElement('li');
        const aTag = document.createElement('a');
        aTag.className = 'menu__link';
        aTag.innerText = navSection.getAttribute('data-nav');

        // scroll to anchor ID using scroll to event
        aTag.addEventListener("click", () => {
            navSection.scrollIntoView({behavior: "smooth"});
            });
        liTag.appendChild(aTag);
        fragment.appendChild(liTag);
    });
    navMenu.appendChild(fragment);
};


// Check if section is in viewport

function isElementInViewport(navSection) {
    const bounding = navSection.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

/**
 * Loop through all section
 * If section is in the vieport Add active state ("your-active-class")
 * If section is not in the viewport Remove active state
 * 
*/

function setActiveSection (){
    navSections.forEach((navSection) => {
        if (isElementInViewport(navSection)){
            navSection.classList.add('your-active-class');
        }
        else {
            navSection.classList.remove('your-active-class');
        }
    });
};


// Build menu

buildNav();

// Set sections as active

document.addEventListener('scroll', setActiveSection);