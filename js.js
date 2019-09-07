"use strict";
const main = document.querySelector("main");
const template = document.querySelector("template").content;
const link = "https://petlatkea.dk/2019/students1991.json";

const hufflepuffBtn = document.querySelector(".huff");
const ravenclawBtn = document.querySelector(".rav");
const slytherinBtn = document.querySelector(".slyth");
const gryfindorBtn = document.querySelector(".gryff");
const allBtn = document.querySelector(".all");
let data;

//load json

function loadJSON(link) {
  fetch(link)
    .then(e => e.json())
    .then(data => data.forEach(displayStudents));

}


///show students

function displayStudents(data) {
  console.log(data);
  const clone = template.cloneNode("true");
  clone.querySelector(".name").textContent = data.fullname;


  if (data.house == "Hufflepuff") {
    clone.querySelector(".houseimg").src = "hufflepuff.png";
    clone.querySelector(".post").classList.add("huff-stud");
  }

  if (data.house == "Slytherin") {
    clone.querySelector(".houseimg").src = "slytherin.png";
    clone.querySelector(".post").classList.add("slyth-stud");
  }
  if (data.house == "Ravenclaw") {
    clone.querySelector(".houseimg").src = "ravenclaw.png";
    clone.querySelector(".post").classList.add("rav-stud");
  }
  if (data.house == "Gryffindor") {
    clone.querySelector(".houseimg").src = "gryffindor.png";
    clone.querySelector(".post").classList.add("gryf-stud");
  }

  let mySelect = document.getElementById('sortby');

  mySelect.onchange = function () {
    let x = document.getElementById("sortby").value;
    document.getElementById("demo").textContent = "Student list is being sorted by: " + x;

    if (document.getElementById("sortby").value == "House") {
      console.log("it works");
      data.sort(function (a, b) {
        let nameA = a.data.house.toUpperCase(); // ignore upper and lowercase
        let nameB = b.data.house.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      })
      data.forEach(displayStudents);
    }
    if (document.getElementById("sortby").value == "First Name") {
      console.log("it works too");
      data.sort(function (a, b) {
        let nameA = a.data.fullname.toUpperCase(); // ignore upper and lowercase
        let nameB = b.data.fullname.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      })
      data.forEach(displayStudents);
    }
    if (document.getElementById("sortby").value == "Last Name") {
      console.log("it works three")
      data.sort(function (a, b) {
        const fullName2 = data.fullname;
        const names = fullName2.split(" ");


        const firstName = names[0];
        const middleName = names.slice(1, names.length);
        const middleNameStr = middleName.join(" ");
        const lastName = names[names.length - 1];


        let nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
        let nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      })
      data.forEach(displayStudents);

    }

  }

  console.log(data);

  main.appendChild(clone)
}

hufflepuffBtn.addEventListener('click', HideforHuff);

//filter students

function HideforHuff() {
  document.querySelectorAll('.gryf-stud').forEach(function (elHide) {
    elHide.style.display = 'none';
  });
  document.querySelectorAll('.slyth-stud').forEach(function (elHide) {
    elHide.style.display = 'none';
  });
  document.querySelectorAll('.rav-stud').forEach(function (elHide) {
    elHide.style.display = 'none';
  });
  document.querySelectorAll('.huff-stud').forEach(function (elHide) {
    elHide.style.display = 'block';
  });

}

ravenclawBtn.addEventListener('click', HideforRav);

function HideforRav() {
  document.querySelectorAll('.gryf-stud').forEach(function (elHide) {
    elHide.style.display = 'none';
  });
  document.querySelectorAll('.slyth-stud').forEach(function (elHide) {
    elHide.style.display = 'none';
  });
  document.querySelectorAll('.rav-stud').forEach(function (elHide) {
    elHide.style.display = 'block';
  });
  document.querySelectorAll('.huff-stud').forEach(function (elHide) {
    elHide.style.display = 'none';
  });

}

slytherinBtn.addEventListener('click', HideforSlyth);

function HideforSlyth() {
  document.querySelectorAll('.gryf-stud').forEach(function (elHide) {
    elHide.style.display = 'none';
  });
  document.querySelectorAll('.slyth-stud').forEach(function (elHide) {
    elHide.style.display = 'block';
  });
  document.querySelectorAll('.rav-stud').forEach(function (elHide) {
    elHide.style.display = 'none';
  });
  document.querySelectorAll('.huff-stud').forEach(function (elHide) {
    elHide.style.display = 'none';
  });

}

slytherinBtn.addEventListener('click', HideforSlyth);

function HideforSlyth() {
  document.querySelectorAll('.gryf-stud').forEach(function (elHide) {
    elHide.style.display = 'none';
  });
  document.querySelectorAll('.slyth-stud').forEach(function (elHide) {
    elHide.style.display = 'block';
  });
  document.querySelectorAll('.rav-stud').forEach(function (elHide) {
    elHide.style.display = 'none';
  });
  document.querySelectorAll('.huff-stud').forEach(function (elHide) {
    elHide.style.display = 'none';
  });

}


gryfindorBtn.addEventListener('click', HideforGryff);

function HideforGryff() {
  document.querySelectorAll('.gryf-stud').forEach(function (elHide) {
    elHide.style.display = 'block';
  });
  document.querySelectorAll('.slyth-stud').forEach(function (elHide) {
    elHide.style.display = 'none';
  });
  document.querySelectorAll('.rav-stud').forEach(function (elHide) {
    elHide.style.display = 'none';
  });
  document.querySelectorAll('.huff-stud').forEach(function (elHide) {
    elHide.style.display = 'none';
  });

}

allBtn.addEventListener('click', hideNone);

function hideNone() {
  document.querySelectorAll('.gryf-stud').forEach(function (elHide) {
    elHide.style.display = 'block';
  });
  document.querySelectorAll('.slyth-stud').forEach(function (elHide) {
    elHide.style.display = 'block';
  });
  document.querySelectorAll('.rav-stud').forEach(function (elHide) {
    elHide.style.display = 'block';
  });
  document.querySelectorAll('.huff-stud').forEach(function (elHide) {
    elHide.style.display = 'block';
  });
}

//Sorting isn't working but i now know that it's because the KneelessFucker is an object and I need an array to sort.


//modal










loadJSON(link);
