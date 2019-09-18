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

//sorting needs to be done still

//modal

loadJSON(link);
