"use strict";
//====================This Code In Vanilla JS Version Without any jQuery Code To increase Performance
//====================You Will Find Same Finctions Down with jQuery
//====================Side Navigation Bar====================Start
const sideNav = document.querySelector(".side-nav");
const openCloseIcon = document.querySelector("#closeOpen");
const links = document.querySelectorAll(".up li");
// Speed in jQuery (Slow Normal Fast) ==> (600ms 400ms 200ms) So I Used 0.6s
function openSideNav() {
  //animation to move side nav on click Open
  sideNav.style.transition = "left 0.6s linear";
  sideNav.style.left = "0";
  //change icon by changing class name
  openCloseIcon.classList.remove("fa-align-justify");
  openCloseIcon.classList.add("fa-x");
  //animation for every li by using transition
  var counter = 0;
  links.forEach((li, i) => {
    // transition: top 500 + (counter for every li ) linear
    li.style.transition = `top ${600 + counter}ms linear `;
    li.style.top = "0";
    counter += 100;
  });
}
function closeSideNav() {
  //animation to move side nav on click close
  sideNav.style.transition = "left 0.6s linear";
  sideNav.style.left = "-259px";
  //change icon by changing class name
  openCloseIcon.classList.add("fa-align-justify");
  openCloseIcon.classList.remove("fa-x");
  //animation for every li by using transition
  links.forEach((li) => {
    li.style.transition = "top 600ms linear";
    li.style.top = "300";
  });
}
function toggleSideNav() {
  // Check the current state of the side nav
  const isOpen = sideNav.style.left === "0px";
  isOpen ? closeSideNav() : openSideNav();
}
openCloseIcon.addEventListener("click", toggleSideNav);
closeSideNav(); //To make user feel with animation of Navigation Bar
//====================Side Navigation Bar====================End
// Utility function for making API requests
async function fetchData(url) {
  try {
    showPreLoader();
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    hidePreLoader();
  }
}

// Fetch meals after search by name Usnig Utility Function For Fetch
async function fetchSearchByName(identifier) {
  try {
    const data = await fetchData(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${identifier}`
    );
    displayMeals(data.meals);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Fetch categories Usnig Utility Function For Fetch
async function fetchCategories() {
  try {
    const data = await fetchData(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    displayCategories(data.categories);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Fetch area Usnig Utility Function For Fetch
async function fetchArea() {
  try {
    const data = await fetchData(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    displayArea(data.meals);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Fetch ingredients Usnig Utility Function For Fetch
async function fetchIngredients() {
  try {
    const data = await fetchData(
      "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
    );
    displayIngredients(data.meals.slice(0, 10));
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Fetch meals by category Usnig Utility Function For Fetch
async function getMealsInSingleCategory(category) {
  try {
    const data = await fetchData(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    displayMeals(data.meals);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Fetch meals of search after getting letter
async function fetchSearchByLetter(identifier) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${identifier}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displayMeals(data.meals);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
// Fetch meals after getting special area
async function getMealsInSingleArea(area) {
  try {
    showPreLoader();
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displayMeals(data.meals);
    hidePreLoader();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
// Fetch meals after getting special Ingredient
async function getMealsInSingleIngredient(ingredient) {
  try {
    showPreLoader();
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    displayMeals(data.meals);
    hidePreLoader();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
// Fetch details of special meal after sending meal ID
async function getMealDetailsById(id) {
  try {
    showPreLoader();
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    DisplaySingleMealDetails(data.meals[0]);
    hidePreLoader();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
// handle Preloader until data fetched and return with valid request
function showPreLoader() {
  document.querySelector(".loading").classList.remove("d-none");
}
function hidePreLoader() {
  document.querySelector(".loading").classList.add("d-none");
}
// This Function Handle the Section with data to display
function hideShowSection(SectionName) {
  const arrOfSections = [
    ".search-section",
    ".area-section",
    ".ingredients-section",
    ".contact-section",
    ".categories-section",
    ".meal-details",
  ];
  arrOfSections.forEach((sectionSelector) => {
    const section = document.querySelector(sectionSelector);
    section.classList.toggle(
      "d-none",
      !section.classList.contains(SectionName)
    );
  });
}

document.getElementById("SearchByName").addEventListener("keyup", function () {
  let term = document.getElementById("SearchByName").value;
  fetchSearchByName(term);
});

document
  .getElementById("SearchByLetter")
  .addEventListener("keyup", function () {
    let term = document.getElementById("SearchByLetter").value;
    fetchSearchByName(term);
  });
function displayMeals(data) {
  let temp = "";
  for (let i = 0; i < data.length; i++) {
    temp += `
      <div class="col-md-3">
          <div class="category-item position-relative overflow-hidden border border-1 border-danger" onclick="getMealDetailsById(${data[i].idMeal})">
              <img class="w-100" src="${data[i].strMealThumb}">
              <div class="layer top-100 position-absolute w-100 h-100 text-center p-2">
                  <h3>${data[i].strMeal}</h3>
              </div>
          </div>    
      </div>`;
  }
  hideShowSection("categories-section");
  document.getElementById("display&cat").innerHTML = temp;
}

function displayCategories(data) {
  let temp = "";
  for (let i = 0; i < data.length; i++) {
    temp += `
    <div class="col-md-3">
        <div class="category-item position-relative overflow-hidden border border-1 border-danger" onclick="getMealsInSingleCategory('${data[i].strCategory}')">
            <img class="w-100" src="${data[i].strCategoryThumb}" alt="" srcset="" />
            <div class="layer top-100 position-absolute w-100 h-100 text-center p-2">
                <h3>${data[i].strCategory}</h3>
                <p>${data[i].strCategoryDescription}</p>
            </div>
        </div>
    </div>
    `;
  }
  hideShowSection("categories-section");
  document.getElementById("display&cat").innerHTML = temp;
}

function displayArea(data) {
  let temp = "";
  for (let i = 0; i < data.length; i++) {
    temp += `
    <div class="col-md-3">
        <div class="area-item text-center" onclick="getMealsInSingleArea('${data[i].strArea}')">
            <i class="fa-solid fa-house-laptop fa-4x" style="color: #f9f6f6"></i>
            <h3 class="">${data[i].strArea}</h3>
        </div>
    </div>`;
  }
  document.getElementById("area").innerHTML = temp;
  hideShowSection("area-section");
}

function displayIngredients(data) {
  let temp = "";
  for (let i = 0; i < data.length; i++) {
    temp += `
    <div class="col-md-3">
        <div class="ingredients-item text-center" onclick="getMealsInSingleIngredient('${
          data[i].strIngredient
        }')">
            <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #f9f6f6"></i>
            <h3 class="">${data[i].strIngredient}</h3>
            <p>${data[i].strDescription.split(" ").slice(0, 10).join(" ")}</p>
        </div>
    </div>
    `;
  }
  document.getElementById("ingredients").innerHTML = temp;
  hideShowSection("ingredients-section");
}

function DisplaySingleMealDetails(data) {
  let ingredients = returnIngredientForSingleMeal(data);
  let tags = retunTagsForSingleMeal(data);
  document.getElementById("mealDetails").innerHTML = `
    <div class="col-md-4">
        <img src="${data.strMealThumb}" class="w-100">
        <h2>${data.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${data.strInstructions}</p>
        <h3><b>Area</b>:${data.strArea}</h3>
        <h3><b>Category</b>:${data.strCategory}</h3>
        <ul class="list-unstyled d-flex g-4 flex-wrap">
            ${ingredients}
        </ul>
        <h3><b>Tags:</b></h3>
        <ul class="list-unstyled d-flex g-4 flex-wrap">
           ${tags}
        </ul>
        <a href="${data.strSource}" class="btn btn-success" target="_blank">Source</a>
        <a href="${data.strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
    </div>
    `;
  hideShowSection("meal-details");
}

function DisplaySingleMealDetails(data) {
  let ingredients = returnIngredientForSingleMeal(data);
  let tags = returnTagsForSingleMeal(data);
  document.getElementById("mealDetails").innerHTML = `
    <div class="col-md-4">
        <img src="${data.strMealThumb}" class="w-100">
        <h2>${data.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${data.strInstructions}</p>
        <h3><b>Area</b>: ${data.strArea}</h3>
        <h3><b>Category</b>: ${data.strCategory}</h3>
        <ul class="list-unstyled d-flex g-4 flex-wrap">
            ${ingredients}
        </ul>
        <h3><b>Tags:</b></h3>
        <ul class="list-unstyled d-flex g-4 flex-wrap">
            ${tags}
        </ul>
        <a href="${data.strSource}" class="btn btn-success" target="_blank">Source</a>
        <a href="${data.strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
    </div>
    `;
  hideShowSection("meal-details");
}

function returnIngredientForSingleMeal(data) {
  let allIngredient = ``;
  // strIngredient count is 20
  for (let i = 1; i <= 20; i++) {
    if (data[`strIngredient${i}`] !== "") {
      allIngredient += `<li class="alert alert-info m-2 p-2">${
        data[`strMeasure${i}`]
      } ${data[`strIngredient${i}`]}</li>\n`;
    }
  }
  return allIngredient;
}

function returnTagsForSingleMeal(data) {
  let tags = data.strTags.split(",");
  let allTags = ``;
  for (let i = 0; i < tags.length; i++) {
    allTags += ` <li class="alert alert-light m-2 p-1">${tags[i]}</li>\n`;
  }
  return allTags;
}


function nameValidation() {
    const nameInput = document.getElementById("name");
    //Seclect div after name input
    const nameWarning = document.querySelector("#name + .alert");
    const isValid = /^[a-zA-Z ]{2,30}$/.test(nameInput.value);
    if( !isValid)
    {
        nameWarning.classList.remove('d-none');
    }else {
        nameWarning.classList.add('d-none');
    }
    return isValid;
}

function emailValidation() {
    const emailInput = document.getElementById("email");
    //Seclect div after email input
    const emailWarning = document.querySelector("#email + .alert"); 
    const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailInput.value);
    if( !isValid)
    {
        emailWarning.classList.remove('d-none');
    }else {
        emailWarning.classList.add('d-none');
    }
    return isValid;
}

function phoneValidation() {
    const phoneInput = document.getElementById("phone");
    //Seclect div after phone input
    const phoneWarning = document.querySelector("#phone + .alert");
    const isValid = /^01[0125][0-9]{8}$/.test(phoneInput.value);

    if( !isValid)
    {
        phoneWarning.classList.remove('d-none');
    }else {
        phoneWarning.classList.add('d-none');
    }
    return isValid;
}

function ageValidation() {
    const ageInput = document.getElementById("age");
    //Seclect div after age input
    const ageWarning = document.querySelector("#age + .alert");
    const isValid = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value);

    if( !isValid)
    {
        ageWarning.classList.remove('d-none');
    }else {
        ageWarning.classList.add('d-none');
    }
    return isValid;
}

function passwordValidation() {
    const passwordInput = document.getElementById("password");
    //Seclect div after password input
    const passwordWarning = document.querySelector("#password + .alert");
    const isValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(passwordInput.value);

    if( !isValid)
    {
        passwordWarning.classList.remove('d-none');
    }else {
        passwordWarning.classList.add('d-none');
    }
    return isValid;
}

function repasswordValidation() {
    const passwordInput = document.getElementById("password");
    const repasswordInput = document.getElementById("repassword");
    //Seclect div after repassword input
    const repasswordWarning = document.querySelector("#repassword + .alert");
    const isValid = passwordInput.value === repasswordInput.value;

    if( !isValid)
    {
        repasswordWarning.classList.remove('d-none');
    }else {
        repasswordWarning.classList.add('d-none');
    }
    return isValid;
}
//this function to control the submit input untill valide all inputs
function changeButtonStatus() {
    const isNameValid = nameValidation();
    const isEmailValid = emailValidation();
    const isPhoneValid = phoneValidation();
    const isAgeValid = ageValidation();
    const isPasswordValid = passwordValidation();
    const isRepasswordValid = repasswordValidation();

    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = !(isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRepasswordValid);
}

//===============Code In jQuery Version===============
/*function openSideNav() {
    $(".side-nav").animate({left:"0"},'slow',"linear");
    $("#closeOpen").removeClass("fa-align-justify");
    $("#closeOpen").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".up li").eq(i).animate({top: "0"}, (500 + (i*100)))
    }
} 
*/
/*function closeSideNav() {
    $(".side-nav").animate({left:"-259"},'slow',"linear");
    $("#closeOpen").removeClass("fa-x");
    $("#closeOpen").addClass("fa-align-justify");
    $(".up li").animate({top:300},600)
}   
*/
//================================= First Way I wrote hideShowSection() function
/*function hideShowSection(SectionName){
    let arrOfSections = [
        document.querySelector(".search-section"),
        document.querySelector(".area-section"),
        document.querySelector(".ingredients-section"),
        document.querySelector(".contact-section"),
        document.querySelector(".categories-section")]
    for(let i = 0 ; i < arrOfSections.length ; i++)
    {
        if(arrOfSections[i].classList.contains(SectionName))
        {
            arrOfSections[i].classList.remove("d-none");
        }
        else
        {
            if(arrOfSections[i].classList.contains("d-none"))
            {
                continue;
            }
            else{
                arrOfSections[i].classList.add("d-none");
            }
        }
    }    
}
*/
