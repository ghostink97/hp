"use strict";

window.addEventListener("DOMContentLoaded", start);

const studlistsect = document.querySelector(".studlist");
const template = document.querySelector("template").content;
const link = "http://petlatkea.dk/2019/hogwartsdata/students.json";
const hufflepuffBtn = document.querySelector(".huff");
const ravenclawBtn = document.querySelector(".rav");
const slytherinBtn = document.querySelector(".slyth");
const gryfindorBtn = document.querySelector(".gryff");
const allBtn = document.querySelector(".all");
const bloodLink = "http://petlatkea.dk/2019/hogwartsdata/families.json";

let students;
let bloodData;

const fullList = [];
let currentList = [];
let expellList = [];
let prefectList = [];

function start() {
  console.log("Fuckin' Ready");

  hufflepuffBtn.addEventListener("click", HideforHuff);
  ravenclawBtn.addEventListener("click", HideforRav);
  slytherinBtn.addEventListener("click", HideforSlyth);
  gryfindorBtn.addEventListener("click", HideforGryff);

  loadJSON(link);
  loadBlood(bloodLink);
}

function loadJSON(link) {
  fetch(link)
    .then(e => e.json())
    .then(jsonData => {
      students = jsonData;
      prepareObjects(jsonData);
    });
}

function loadBlood(bloodLink) {
  fetch(bloodLink)
    .then(e => e.json())
    .then(jsonBlood => {
      bloodData = jsonBlood;
      isthisapuresoul();
    });
}

function prepareObjects(jsonData) {
  jsonData.forEach(jsonObject => {
    const student = Object.create(Student);

    const names = jsonObject.fullname.trim().split(" ");

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
    student.UUID = uuidv4();
    student.prefectStatus = false;
    student.inquisitorStatus = false;
    student.pureblood = true;

    fullList.push(student);
  });
  //console.log(fullList);
  rebuildList();
}

function isthisapuresoul() {
  console.log(bloodData);

  fullList.forEach(onestudent => {
    if (bloodData.half.includes(onestudent.lastName)) {
      onestudent.pureblood = false;
    }
    //console.table(fullList);
  });
}

function rebuildList() {
  displayList(fullList);
  setupListSorting();
}

function setupListSorting() {
  let mySelect = document.getElementById("sorting");

  mySelect.onchange = function() {
    let x = document.getElementById("sorting").value;
    if (x === "First Name") {
      fullList.sort((a, b) => {
        return a.firstName.localeCompare(b.firstName);
      });
      console.log(fullList);
      displayList(fullList);
    }
    if (x === "House") {
      fullList.sort((a, b) => {
        return a.house.localeCompare(b.house);
      });
      console.log(fullList);
      displayList(fullList);
    }

    if (x === "Last Name") {
      fullList.sort((a, b) => {
        return a.lastName.localeCompare(b.lastName);
      });
      console.log(fullList);
      displayList(fullList);
    }
  };
}

function displayList(students) {
  studlistsect.innerHTML = "";
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
  //console.log(student.middleName);

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

  clone.querySelector("[data-action=remove]").dataset.attribute = student.UUID;

  let checkbox = clone.querySelector("#prefect");

  checkbox.addEventListener("change", function() {
    if (this.checked) {
      console.log("is prefect");
      student.prefectStatus = true;
      //console.table(fullList);
    } else {
      student.prefectStatus = false;
      console.log("is not prefect");
      //console.table(fullList);
    }
  });

  let othercheckbox = clone.querySelector("#inq");

  othercheckbox.addEventListener("change", function() {
    if (this.checked) {
      console.log("check if slyth");
      if (student.house === "SLYTHERIN") {
        console.log("student is part of slytherin");
        student.inquisitorStatus = true;
      } else if (student.pureblood === true) {
        console.log("student is pureblood");
        student.inquisitorStatus = true;
      } else {
        console.log("nope");
        alert("Student must be PUREBLOODED or part of HOUSE SLYTHERIN");
      }
    } else {
      console.log("nope");
      student.inquisitorStatus = false;
    }
  });

  clone.querySelector(".openModal").addEventListener("click", () => {
    openModal(student);
  });
  clone.querySelector(".expell").addEventListener("click", expellStudent);

  studlistsect.appendChild(clone);
}

const Student = {
  firstname: "-firstname-",
  middlename: "-middlename-",
  lastname: "-lastname-",
  house: "-house-",
  UUID: "-0",
  prefectStatus: false,
  inquisitorStatus: false,
  pureblood: true
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
  let modal = document.querySelector(".modal");
  modal.classList.remove("inactive");
  modal.querySelector("h2").textContent = entireName;
  modal.querySelector(".studentPic").src = `images/${student.lastName}_${student.firstnamefirstletter}.png`;
  if (student.prefectStatus === true) {
    modal.querySelector(".prefecticon").classList.remove("inactive");
  } else {
    modal.querySelector(".prefecticon").classList.add("inactive");
  }
  if (student.inquisitorStatus === true) {
    modal.querySelector(".inqicon").classList.remove("inactive");
  } else {
    modal.querySelector(".inqicon").classList.add("inactive");
  }

  if (student.pureblood === false) {
    modal.querySelector(".bloodstatus").src = "images/icons/fakeBlood.png";
  } else if (student.pureblood === true) {
    modal.querySelector(".bloodstatus").src = "images/icons/blood-donation.png";
  }

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

  function closeModal() {
    const modal = document.querySelector(".modal");
    modal.classList.add("inactive");
  }
}

function expellStudent() {
  const element = event.target;

  if (element.dataset.action === "remove") {
    element.parentElement.remove();
  }

  const UUID = element.dataset.attribute;
  const indexoffullList = fullList.findIndex(studentUUID);
  function studentUUID(student) {
    if (student.UUID === UUID) {
      return true;
    } else {
      return false;
    }
  }

  fullList.splice(indexoffullList, 1);
  ///expellList.push(deletedElement[0]); or something like that?
  console.log(expellList);
}
//stack overflow content below (https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-2117523)

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
}

console.log(uuidv4());

//this was also taken from stack overflow https://stackoverflow.com/questions/16973240/link-in-alert-boxes-javascript
document.querySelector(".expellangel").addEventListener("click", dontYouDare);

function dontYouDare() {
  if (window.confirm("Click OK, I dare you")) {
    window.location.href = "https://www.youtube.com/watch?v=LPpM8Z5byzs";
  }
}

document.querySelector(".expellangel").addEventListener("click", dontYouDare);

document.querySelector(".angelmodal").addEventListener("click", openangelmodal);

function openangelmodal() {
  let modal = document.querySelector(".modal");
  modal.classList.remove("inactive");
  modal.querySelector("h2").textContent = "Angel Ezra Meyer";
  modal.querySelector(".studentPic").src = `images/angel.png`;
  modal.querySelector(".prefecticon").classList.remove("inactive");
  modal.querySelector(".inqicon").classList.remove("inactive");
  modal.querySelector(".houseimg").src = "slytherin.png";
  modal.querySelector(".bloodstatus").src = "images/icons/blood-donation.png";
}
