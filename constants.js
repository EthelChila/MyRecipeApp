"use strict";
const navSlide = () => {
  const burgerDivEl = document.querySelector(".burger");
  const navEl = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  //Toggle Nav
  /*this because when we click on the burger we want the nav-link to get class of nav-active */

  burgerDivEl.addEventListener("click", () => {
    navEl.classList.toggle("nav-active");

    //Animate Links
    navLinks.forEach((link, index) => {
      // in order for the links to flow nicely with a delay between each of them
      if (link.getElementsByClassName.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 1
        }s`;
      }
    });
    burgerDivEl.classList.toggle("toggle");
  });
};
navSlide();
let favicon = document.querySelector("link[rel~='icon']");
if (!favicon) {
  favicon = document.createElement("link");
  favicon.rel = "icon";
  document.head.appendChild(favicon);
}
favicon.href = "assets/genie-lamp.jpeg";
