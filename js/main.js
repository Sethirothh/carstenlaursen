'use strict'

// ========== GLOBAL letIABLES ========== //
const _marmorRef = _db.collection("cement");
const _cementRef = _db.collection("marmor");
const _emailRef = _db.collection("email");
const _prisRef = _db.collection("pris");
// =========== Firebase Calls ============ //
_cementRef.onSnapshot(function(snapshotData) {
  let cement = snapshotData.docs;
  appendCementSelect(cement);
});
_marmorRef.onSnapshot(function(snapshotData) {
  let marmor = snapshotData.docs;
  appendMarmorSelect(marmor);
});

// =========== MENU FUNCTIONALITY =========== //
function dropdown(){
  let komp = document.querySelector(".dropdown");
  if (komp.classList.contains("active")) {
    komp.classList.remove("active");
  } else {
    komp.classList.add("active");
  }
}
function burgerMenu(){
  let nav = document.querySelector("nav");
  if (nav.classList.contains("menu")) {
    nav.classList.remove("menu");
  } else {
    nav.classList.add("menu");
  }
}
// ============ Contact Form ============ //

function next(i){
  console.log(i);
let current = document.querySelector(`.contact-form div:nth-child(${i-1})`);
let next = document.querySelector(`.contact-form div:nth-child(${i})`)
next.classList.add("active-form");
current.classList.add("inactive-form");

  let percent = 33.334 * (i-1);
  console.log(percent);
  percentage(percent);
return false;
}

function submitMail(){
  let mail = {
    area:   document.querySelector("#area").value,
    circum: document.querySelector("#circum").value,
    room:   document.querySelector("#room").value,
    cement: document.querySelector("#cement").value,
    marmor: document.querySelector("#marmor").value,
    email:  document.querySelector("#email").value,
    name:   document.querySelector("#name").value,
    tlf:    document.querySelector("#telf").value,
  }

  _emailRef.add(mail);

  toastMessage("success");
  showLoader(true);
  setTimeout(function(){
    showPage("home");
    showLoader(false);
    location.reload();
}, 3000);
}

function filledValidation(e){
  let id = document.querySelector(`#${e}`);
  if (id.value == 0) {
    id.classList.add("errorInput");
    if (id.classList.contains("successInput")) {
        id.classList.remove("successInput");
    }
  } else {
    id.classList.add("successInput");
    if (id.classList.contains("errorInput")) {
      id.classList.remove("errorInput")
    }
  }
}
function validation(i){
if (i == 1) {
    let area = document.forms["form"].area.value;
    let circum = document.forms["form"].circum.value;
    let room = document.forms["form"].room.value;
      if (area == "" || circum == "" || room == "") {
        toastMessage("error");
        } else {
          next(i+1);
            _prisRef.where("hrexist", "==", true).get().then(function(querySnapshot) {
            querySnapshot.forEach(function (doc) {
              let price = doc.data().dyrpris;
                      runCalc(parseInt(area), parseInt(circum), price);
    });
  });
        }
  }
  else if (i == 3) {
    let email = document.forms["form"].email.value;
    let navn = document.forms["form"].navn.value;
    let tlf = document.forms["form"].tlf.value;
            if (email == "" || navn == "" || tlf == "") {
              toastMessage("error");
              } else {
            next(i+1);
            }
  }else {
  console.log("something went wrong");
  }
}
function runCalc(area, circum, priser){

  let pris = area*priser+circum;
  console.log(pris);
  let htmlTemplate = "";
  htmlTemplate += `
      <h3>Ca. pris for dit gulv:
      <p class="prisGulv"> ${pris}</p> kr.</h3>

  `;
  document.querySelector(".pris").innerHTML = htmlTemplate;
}
function toastMessage(e){
  let htmlTemplate = `
  <div class='toastmsg'></div>`;
  document.querySelector("body").innerHTML += htmlTemplate;
    let toast = document.querySelector(".toastmsg");
  if (e == "error") {
    toast.classList.add("errortoast");
    toast.innerHTML = `<p>Der mangler at blive udfyldt nogle felter.</p>`;
  } else {
    toast.classList.add("successtoast");
    toast.innerHTML = `<p>Success! Din mail er nu sendt! <br>Du vil blive kontaktet hurtigst muligt.</p>`;
  }setTimeout(function(){
  toast.remove();
}, 4000);
}
function appendMarmorSelect(marmors){
  let htmlTemplate = "";
  for (let cement of marmors) {
    htmlTemplate += `
    <option name="${cement.data().farve.toLowerCase()}" value="${cement.data().varenr}">${cement.data().farve}</option>
    `
  }
  showLoader(false);
  document.querySelector('#marmor').innerHTML = htmlTemplate;
}
function appendCementSelect(cements){
      let htmlTemplate = "";
      for (let cement of cements) {
        htmlTemplate += `
        <option name="${cement.data().farve.toLowerCase()}" value="${cement.data().varenr}">${cement.data().farve}</option>
        `
      }
      document.querySelector('#cement').innerHTML = htmlTemplate;
    }
function percentage(i){
  let number = i;
  let percentage = document.querySelector(".percentage");
  percentage.style.width = `${number}%`;
}
