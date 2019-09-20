"use strict";

window.addEventListener("DOMContentLoaded", start);

const main = document.querySelector("main");
const template = document.querySelector("template").content;
const link = "http://petlatkea.dk/2019/hogwartsdata/students.json";
const hufflepuffBtn = document.querySelector(".huff");
const ravenclawBtn = document.querySelector(".rav");
const slytherinBtn = document.querySelector(".slyth");
const gryfindorBtn = document.querySelector(".gryff");
const allBtn = document.querySelector(".all");

let students;

const fullList = [];
let currentList = [];
/*
const names = data.fullname.split(" ");
const firstName = names[0];
const middleName = names.slice(1, names.length);
const lastName = names[names.length - 1];
*/

function start() {
  console.log("Fuckin' Ready");
  //document.querySelector("#sorting").addEventListener("change", selectSorting);
  hufflepuffBtn.addEventListener("click", HideforHuff);
  ravenclawBtn.addEventListener("click", HideforRav);
  slytherinBtn.addEventListener("click", HideforSlyth);
  gryfindorBtn.addEventListener("click", HideforGryff);

  loadJSON();
}

function loadJSON(link) {
  fetch(link)
    .then(e => e.json())
    .then(jsonData => {
      students = jsonData;
      prepareObjects(jsonData);
    });
}

/*function displayStudentlist() {
  data.forEach(displayStudents);
}*/

function prepareObjects(jsonData) {
  jsonData.forEach(jsonObject => {
    const student = Object.create(Student);

    const names = jsonObject.fullname.trim().split(" ");
    //${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
    student.firstName = names[0];
    if (names.length <= 2) {
      student.middleName = "";
    } else {
      student.middleName = names[names.length - 2];
    }
    student.lastName = names[names.length - 1];
    student.firstnamefirstletter = student.firstName.charAt(0).toLowerCase();
    student.house = jsonObject.house.toUpperCase().trim();
    student.fullname = jsonObject.fullname.trim().split(" ");

    fullList.push(student);
  });
  console.log(fullList);
  rebuildList();
}

function rebuildList(students) {
  sortListBy("firstname");
  displayList(fullList);
}

function sortListBy(prop) {
  //currentList.sort((a, b) => (a[prop] > b[prop] ? 1 : -1)); // Don't copy this sorting function, it sucks ...
  console.log("laterbuddy");
}

function displayList(students) {
  students.forEach(displayStudents);
}

///show students

function displayStudents(student) {
  const clone = template.cloneNode("true");
  let firstName = student.firstName.trim();
  let middleName = student.middleName.trim();
  let lastName = student.lastName.trim();
  let entireName =
    firstName.charAt(0).toUpperCase() +
    firstName.slice(1).toLowerCase() +
    " " +
    middleName.charAt(0).toUpperCase() +
    middleName.slice(1).toLowerCase() +
    " " +
    lastName.charAt(0).toUpperCase() +
    lastName.slice(1).toLowerCase();
  if (firstName === "Ernest") {
    entireName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase() + " " + middleName + " " + lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
  }
  console.log(student.middleName);

  clone.querySelector(".name").textContent = entireName;

  if (student.house == "HUFFLEPUFF") {
    clone.querySelector(".houseimg").src = "hufflepuff.png";
    clone.querySelector(".post").classList.add("huff-stud");
  }

  if (student.house == "SLYTHERIN") {
    clone.querySelector(".houseimg").src = "slytherin.png";
    clone.querySelector(".post").classList.add("slyth-stud");
  }
  if (student.house == "RAVENCLAW") {
    clone.querySelector(".houseimg").src = "ravenclaw.png";
    clone.querySelector(".post").classList.add("rav-stud");
  }
  if (student.house == "GRYFFINDOR") {
    clone.querySelector(".houseimg").src = "gryffindor.png";
    clone.querySelector(".post").classList.add("gryf-stud");
  }

  clone.querySelector(".openModal").addEventListener("click", () => {
    openModal(student);
  });
  console.log(student);

  main.appendChild(clone);
}

const Student = {
  firstname: "-firstname-",
  middlename: "-middlename-",
  lastname: "-lastname-",
  house: "-house-"
};

//filter students - condense this if you have time

function HideforHuff() {
  document.querySelectorAll(".gryf-stud").forEach(function(elHide) {
    elHide.style.display = "none";
  });
  document.querySelectorAll(".slyth-stud").forEach(function(elHide) {
    elHide.style.display = "none";
  });
  document.querySelectorAll(".rav-stud").forEach(function(elHide) {
    elHide.style.display = "none";
  });
  document.querySelectorAll(".huff-stud").forEach(function(elHide) {
    elHide.style.display = "block";
  });
}

function HideforRav() {
  document.querySelectorAll(".gryf-stud").forEach(function(elHide) {
    elHide.style.display = "none";
  });
  document.querySelectorAll(".slyth-stud").forEach(function(elHide) {
    elHide.style.display = "none";
  });
  document.querySelectorAll(".rav-stud").forEach(function(elHide) {
    elHide.style.display = "block";
  });
  document.querySelectorAll(".huff-stud").forEach(function(elHide) {
    elHide.style.display = "none";
  });
}

function HideforSlyth() {
  document.querySelectorAll(".gryf-stud").forEach(function(elHide) {
    elHide.style.display = "none";
  });
  document.querySelectorAll(".slyth-stud").forEach(function(elHide) {
    elHide.style.display = "block";
  });
  document.querySelectorAll(".rav-stud").forEach(function(elHide) {
    elHide.style.display = "none";
  });
  document.querySelectorAll(".huff-stud").forEach(function(elHide) {
    elHide.style.display = "none";
  });
}

function HideforGryff() {
  document.querySelectorAll(".gryf-stud").forEach(function(elHide) {
    elHide.style.display = "block";
  });
  document.querySelectorAll(".slyth-stud").forEach(function(elHide) {
    elHide.style.display = "none";
  });
  document.querySelectorAll(".rav-stud").forEach(function(elHide) {
    elHide.style.display = "none";
  });
  document.querySelectorAll(".huff-stud").forEach(function(elHide) {
    elHide.style.display = "none";
  });
}

allBtn.addEventListener("click", hideNone);

function hideNone() {
  document.querySelectorAll(".gryf-stud").forEach(function(elHide) {
    elHide.style.display = "block";
  });
  document.querySelectorAll(".slyth-stud").forEach(function(elHide) {
    elHide.style.display = "block";
  });
  document.querySelectorAll(".rav-stud").forEach(function(elHide) {
    elHide.style.display = "block";
  });
  document.querySelectorAll(".huff-stud").forEach(function(elHide) {
    elHide.style.display = "block";
  });
}

//sorting - needs to be done still

//modal
/*
document.querySelector(".angelModal").addEventListener("click", openmodalAngel());

function openmodalAngel() {
  const modal = document.querySelector(".modal");
  modal.classList.remove("inactive");
}
*/
function openModal(student) {
  let firstName = student.firstName.trim();
  let middleName = student.middleName.trim();
  let lastName = student.lastName.trim();
  let entireName =
    firstName.charAt(0).toUpperCase() +
    firstName.slice(1).toLowerCase() +
    " " +
    middleName.charAt(0).toUpperCase() +
    middleName.slice(1).toLowerCase() +
    " " +
    lastName.charAt(0).toUpperCase() +
    lastName.slice(1).toLowerCase();
  if (firstName === "Ernest") {
    entireName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase() + " " + middleName + " " + lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
  }
  const modal = document.querySelector(".modal");
  modal.classList.remove("inactive");
  modal.querySelector("h2").textContent = entireName;
  modal.querySelector(".studentPic").src = `images/${student.lastName}_${student.firstnamefirstletter}.png`;
  modal.querySelector("#x").addEventListener("click", () => {
    closeModal();
  });

  if (student.house === "GRYFFINDOR") {
    modal.querySelector("#houseicon").src = "gryffindor.png";
  } else if (student.house === "SLYTHERIN") {
    modal.querySelector("#houseicon").src = "slytherin.png";
  } else if (student.house === "HUFFLEPUFF") {
    modal.querySelector("#houseicon").src = "hufflepuff.png";
  } else if (student.house === "RAVENCLAW") {
    modal.querySelector("#houseicon").src = "ravenclaw.png";
  }

  //checkbox eventlistener code inspired by stackoverflow ()
  /* let checkboxPref = document.querySelector(".prefectbox");

  checkboxPref.addEventListener("change", function() {
    if (this.checked) {
      modal.querySelector(".prefecticon").classList.remove("inactive");
    } else {
      console.log("is not checked");
      modal.querySelector(".prefecticon").classList.add("inactive");
    }
  });*/

  function closeModal() {
    const modal = document.querySelector(".modal");
    modal.classList.add("inactive");
  }
}

loadJSON(link);
