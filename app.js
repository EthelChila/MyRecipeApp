let favicon = document.querySelector("link[rel~='icon']");
if (!favicon) {
  favicon = document.createElement("link");
  favicon.rel = "icon";
  document.head.appendChild(favicon);
}
favicon.href = "assets/genie-lamp.jpeg";

const navSlide = () => {
  const burgerDivEl = document.querySelector(".burger");
  const navEl = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burgerDivEl.addEventListener("click", () => {
    navEl.classList.toggle("nav-active");

    navLinks.forEach((link, index) => {
      if (link.classList.contains("animation")) {
        link.style.animation = "";
      } else {
        setTimeout(() => {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 1
          }s`;
        }, 50);
      }
    });

    burgerDivEl.classList.toggle("toggle");
  });
};

navSlide();

// Main SECTION
// Pop-up msgs

const MsgEl = document.querySelectorAll(".message");
const closeMsgBtns = document.querySelectorAll(".close-msg");
const showMsgBtns = document.querySelectorAll(".show-msg-btn");
const overlayEl = document.querySelector(".overlay");
const closeMsg = () => {
  MsgEl.forEach((el) => {
    el.classList.add("hidden");
    overlayEl.classList.add("hidden");
  });
};
showMsgBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const msgId = btn.getAttribute("data-msg");
    const message = document.getElementById(msgId);
    message.classList.remove("hidden");
    overlayEl.classList.remove("hidden");
  });
});

closeMsgBtns.forEach((btn) => {
  btn.addEventListener("click", closeMsg);
});
overlayEl.addEventListener("click", closeMsg);

// THE SEARCH

const theSearchIcon = document.querySelector(".search-icon");
const theSearchBox = document.querySelector(".search-box");
const closeSearchBtn = document.querySelector(".close-search");
const divToBeHidden = document.querySelector(".to-be-hidden");
const header = document.querySelector(".header-container");
theSearchIcon.addEventListener("click", () => {
  theSearchIcon.classList.add("hidden");
  theSearchBox.classList.remove("hidden");
  divToBeHidden.classList.add("hidden");
  header.classList.add("hidden");
});
closeSearchBtn.addEventListener("click", () => {
  theSearchIcon.classList.remove("hidden");
  theSearchBox.classList.add("hidden");
  header.classList.remove("hidden");
  divToBeHidden.classList.remove("hidden");
});
// SEARCH BOX
//API DATA

const APP_ID = "ca0783d6";
const APP_KEY = "ff2184e02bd63071d9555765e1fe7077";
const URL = `https://api.edamam.com/search?app_key=${APP_KEY}&app_id=${APP_ID}&to=21&q=`;

const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");

let searchResult = "";

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  searchResult = e.target.querySelector("input").value;
  const data = await fetchAPI(searchResult);
  createHTML(data.hits);
});

const fetchAPI = async (searchResult) => {
  try {
    const searchAPI = `${URL}${searchResult}`;
    const response = await fetch(searchAPI);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("An error occurred:", error.message);
    searchResultDiv.innerHTML = `<p class="error-message">An error occurred: ${error.message}</p>`;
  }
};

//
const createHTML = (results) => {
  // in order to create an html el whenever I loop through the array
  let createdHTML = "";

  results.map((result) => {
    createdHTML += `<div class="search-item">
        <img src=${result.recipe.image}>
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
          </div>
           <p class ="item-data2">Cuisine: ${result.recipe.cuisineType}</p>
            <p class="item-data2">Minutes taken:${
              result.recipe.totalTime > 0
                ? result.recipe.totalTime
                : `Time not specified`
            }</p>
          <p class="item-data">Calories: ${Math.round(
            result.recipe.calories
          )} kcals </p>
           <p class="item-data">Ingredients: ${
             result.recipe.ingredientLines
           }</p>
           <button class="view-recipe-btn">
          <a href="${
            result.recipe.url
          }" target ="_blank">View Recipe</a><span>&rarr;</span>
          </button>
      </div>
  `;
  });

  searchResultDiv.innerHTML = createdHTML;
};
