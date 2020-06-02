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
        aTag.innerText = navSection.getAttribute('data-nav');
        aTag.setAttribute('class', 'menu__link');

        // scroll to anchor ID using scroll to event
        aTag.addEventListener("click", () => {
            navSection.scrollIntoView({behavior: "smooth"});
            });
        liTag.appendChild(aTag);
        fragment.appendChild(liTag);
    });
    navMenu.appendChild(fragment);
};

function getVisibleSectionIndex() {
    let minor = window.innerHeight;
    visibleSectionIndex = -1;

    navSections.forEach((navSection, index) => {
        let offset = navSection.getBoundingClientRect();
        if(Math.abs(offset.top) < minor){
            minor = Math.abs(offset.top);
            visibleSectionIndex = index;
        }
    });
    return visibleSectionIndex;
}

function setActiveSection(){
    visibleSectionIndex = getVisibleSectionIndex();

    // If visibleSection exists
    if(visibleSectionIndex != -1){
        // create a list of Atags from navigation menu
        let navATagList = document.querySelectorAll('.menu__link');

        // Loop through all section
        for (let i = 0; i < navSections.length; i++) {
            // For section in viewport: Add active state to the section and navigation
            if (i == visibleSectionIndex){
                navSections[i].classList.add('your-active-class');
                navATagList[i].classList.add('your-active-class');
            }
            // For other sections: Remove active state from the section and navigation
            else{
                navSections[i].classList.remove('your-active-class');
                navATagList[i].classList.remove('your-active-class');
            }
        }; 
    };
}

// Build navigation menu
buildNav();

// Set sections as active (highlight section and nav if section is in viewport)
document.addEventListener('scroll', setActiveSection);
