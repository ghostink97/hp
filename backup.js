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

let data;
/*
const names = data.fullname.split(" ");
const firstName = names[0];
const middleName = names.slice(1, names.length);
const lastName = names[names.length - 1];
*/
function start() {
  console.log("Fuckin' Ready");
  loadJSON();
}

//load json

function loadJSON(link) {
  fetch(link)
    .then(e => e.json())
    .then(jsonData => {
      data = jsonData;

      displayStudentlist();
    });
}

function displayStudentlist() {
  data.forEach(displayStudents);
}

///show students

function displayStudents(data) {
  console.log(data);
  const clone = template.cloneNode("true");
  clone.querySelector(".name").textContent = data.fullname;

  if (data.house.toUpperCase().trim() == "HUFFLEPUFF") {
    clone.querySelector(".houseimg").src = "hufflepuff.png";
    clone.querySelector(".post").classList.add("huff-stud");
  }

  if (data.house.toUpperCase().trim() == "SLYTHERIN") {
    clone.querySelector(".houseimg").src = "slytherin.png";
    clone.querySelector(".post").classList.add("slyth-stud");
  }
  if (data.house.toUpperCase().trim() == "RAVENCLAW") {
    clone.querySelector(".houseimg").src = "ravenclaw.png";
    clone.querySelector(".post").classList.add("rav-stud");
  }
  if (data.house.toUpperCase().trim() == "GRYFFINDOR") {
    clone.querySelector(".houseimg").src = "gryffindor.png";
    clone.querySelector(".post").classList.add("gryf-stud");
  }

  clone.querySelector(".openModal").addEventListener("click", () => {
    openModal(data);
  });
  console.log(data);

  main.appendChild(clone);
}

//filter students - condense this if you have time

hufflepuffBtn.addEventListener("click", HideforHuff);

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

ravenclawBtn.addEventListener("click", HideforRav);

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

slytherinBtn.addEventListener("click", HideforSlyth);

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

slytherinBtn.addEventListener("click", HideforSlyth);

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

gryfindorBtn.addEventListener("click", HideforGryff);

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
function openModal(data) {
  const names = data.fullname.trim().split(" ");

  const firstName = names[0];
  const middleName = names.slice(1, names.length);
  const lastName = names[names.length - 1];
  const firstnamefirstletter = firstName.charAt(0).toLowerCase();
  console.log(firstnamefirstletter);
  console.log(lastName);

  const modal = document.querySelector(".modal");
  modal.classList.remove("inactive");
  modal.querySelector("h2").textContent = data.fullname;
  modal.querySelector(".studentPic").src = `images/${lastName}_${firstnamefirstletter}.png`;
  modal.querySelector("#x").addEventListener("click", () => {
    closeModal();
  });

  if (data.house.toUpperCase().trim() === "GRYFFINDOR") {
    modal.querySelector("#houseicon").src = "gryffindor.png";
  } else if (data.house.toUpperCase().trim() === "SLYTHERIN") {
    modal.querySelector("#houseicon").src = "slytherin.png";
  } else if (data.house.toUpperCase().trim() === "HUFFLEPUFF") {
    modal.querySelector("#houseicon").src = "hufflepuff.png";
  } else if (data.house.toUpperCase().trim() === "RAVENCLAW") {
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
