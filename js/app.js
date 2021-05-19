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
 * Define Global letiables
 * 
*/
const sections = document.querySelectorAll('section');
const navbar = document.getElementById('navbar__list');
const navbarList = document.querySelectorAll('.navbar__menu ul li');
/**
 * End Global letiables
 * 
 * Start Helper Functions
 * 
*/
function isTopSectionInViewport(el) {
    // get the coordinates of the element box from the viewport
    const rect = el.getBoundingClientRect();
    // return true if the element top is near the top of the viewport
    return (
      rect.top >= 0 && rect.top <=  0.4 * (window.innerHeight || document.documentElement.clientHeight)
    );
  }


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const navBuliding = () => {
    let navContent = ``;
    sections.forEach(section => {
        const sectionId = section.id;
        const navLinkName = section.dataset.nav;
        navContent += `<li><a class="menu__link" href="#${sectionId}">${navLinkName}</a></li>`;
    });
    //append all emelmnets to navbar
    navbar.innerHTML = navContent;

}
navBuliding();

// Add class 'active' to section when near top of viewport when scrolling
window.addEventListener('scroll' , () =>{
  let scrollPosition = document.documentElement.scrollTop;

  sections.forEach((section) => {
    if (
      scrollPosition >= section.offsetTop - section.offsetHeight * 0.25 &&
      scrollPosition <  section.offsetTop + section.offsetHeight - section.offsetHeight * 0.25) {
      let currentId = section.attributes.id.value;
      removeAllActiveClasses();
      addActiveClass(currentId);
    }
  });
})

//remove active class
let removeAllActiveClasses = function () {
  document.querySelectorAll("nav a").forEach((el) => {
    el.classList.remove("active");
  });
};

//add active class
let addActiveClass = function (id) {
  let selector = `nav ul a[href="#${id}"]`;
  document.querySelector(selector).classList.add("active");
};

/**
 * End Main Functions
 * Begin Events
 * 
*/
// Scroll to section on link click
let navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    let currentId = e.target.attributes.href.value;
    let section = document.querySelector(currentId);
    let sectionPosition = section.offsetTop;
//for smooth scrolling when clicking to section links
    window.scroll({
      top: sectionPosition,
      behavior: "smooth",
    });
  });
});