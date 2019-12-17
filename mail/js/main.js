
// ========== FIREBASE AUTH ========== //
// Listen on authentication state change
firebase.auth().onAuthStateChanged(function(user) {
  if (user) { // if user exists and is authenticated
    userAuthenticated(user);
  } else { // if user is not logged in
    userNotAuthenticated();
  }
});

function userAuthenticated(user) {
  _currentUser = user;
  setDefaultPage();
  hideTabbar(false);
  showLoader(false);
}
function userNotAuthenticated() {
  _currentUser = null; // reset _currentUser
  hideTabbar(true);
  showPage("login");

  // Firebase UI configuration
  const uiConfig = {
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: '#home'
  };
  // Init Firebase UI Authentication
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig);
  showLoader(false);
}
const _marmorRef = _db.collection("cement");
const _cementRef = _db.collection("marmor");
const _emailRef = _db.collection("email");
const _prisRef = _db.collection("pris");

_prisRef.onSnapshot(function(snapshotData){
  let prices = snapshotData.docs;
  appendPrices(prices);
});
_emailRef.onSnapshot(function(snapshotData) {
  let emails = snapshotData.docs;
  appendEmails(emails);
});
_marmorRef.onSnapshot(function(snapshotData){
  let marmor = snapshotData.docs;
  appendMarmor(marmor);
});
_cementRef.onSnapshot(function(snapshotData){
  let cement = snapshotData.docs;
  appendCement(cement);
});

//CRUD Funktioner til Marmor / Cement.
//Create functions ==
function addNew(i){
  if (i == 1) {
    document.querySelector("#newMarmor").style.width = "400px";
  } else if (i == 2) {
    document.querySelector("#newCement").style.width = "400px";
  }
}
function addMarmor(varenr){
  let info = {
    farve: document.querySelector("#farve-input-marmor").value,
    varenr: varenr,
    hex: document.querySelector("#hex3").value
  }
  _marmorRef.add(info);
}
function addCement(varenr){
  let info = {
    farve: document.querySelector("#farve-input-cement").value,
    varenr: varenr,
    hex: document.querySelector("#hex4").value
  }
  _cementRef.add(info);
}
//Read functions ===
function appendMarmor(marmors){
  let newid = marmors.length;
  let htmlTemplate = `<div class="updateColors" id="updateMarmor">
  <div class="close" onclick="closeUpdate(1)">
    <span></span>
    <span></span>
  </div>
    <input type="text" id="marmor-input" placeholder="farve ...">
    <input type="text" id="id-marmor-input" placeholder="varenr ..." readonly>
    <input type="text" id="varenr-marmor-input" placeholder="varenr ...">
    <div class="hex-color" id="hex-marmor">
      <label for="hex1">Vælg en farve</label>
      <input type="color" placeholder="color" oninput="colorChange(1)" value="#c4302b" id="hex1" name="hex1" />
    </div>
    <div onclick="deleteMarmor()" class="deleteMaterial"><img src="img/delete.svg"></div>
    <button class="edit" onclick="updateMaterial(1)">Update</button>
  </div>
  <h2> Vælg Marmor </h2>
  <div class="wrap">`;
  for (marmor of marmors) {
      htmlTemplate += `
        <article class="cements" style="background-color:${marmor.data().hex}">
            <p>${marmor.data().farve}</p>
          <button class="edit" onclick="updateColor(1, '${marmor.id}', '${marmor.data().farve}', '${marmor.data().hex}', ${marmor.data().varenr})">Skift Farve</button>
        </article>
      `;
  }
  htmlTemplate += `
  <article class="cements">
        <img src="img/plus-sign.svg" onclick="addNew(1)">
  </article>
  </div>
  <div class="addnewcement" id="newMarmor">
  <div class="closenew" id="cementclose" onclick="closeNew(1)"><span></span><span></span></div>
  <input type="text" id="farve-input-marmor">
  <div class="hex-color" id="hex-add">
    <label for="hex3">Vælg en farve</label>
    <input type="color" placeholder="color" oninput="colorChange(3)" value="#c4302b" id="hex3" name="hex3" />
  </div>
  <button onclick="addMarmor(${newid+1})">Tilføj Marmor</button>
  </div>
  `;
  document.querySelector("#marmor").innerHTML = htmlTemplate;
}
function appendCement(cements){
  let newid = cements.length;
  let htmlTemplate = `<div class="updateColors" id="updateCement">
  <div class="close" onclick="closeUpdate(2)">
    <span></span>
    <span></span>
  </div>

    <input type="text" id="cement-input" placeholder="farve ...">
    <input type="text" id="id-cement-input" placeholder="varenr ..." readonly>
    <input type="text" id="varenr-cement-input" placeholder="varenr ...">
    <div class="hex-color" id="hex-cement">
      <label for="hex2">Vælg en farve</label>
      <input type="color" placeholder="color" oninput="colorChange(2)" value="#c4302b" id="hex2" name="hex2" />
    </div>
    <div onclick="deleteCement()" class="deleteMaterial"><img src="img/delete.svg"></div>
    <button class="edit" onclick="updateMaterial(2)">Update</button>
  </div>
  <h2> Vælg Cement </h2>
  <div class="wrap">`;
  for (cement of cements) {
      htmlTemplate += `
        <article class="cements" style="background-color:${cement.data().hex}">
            <p>${cement.data().farve}</p>
          <button class="edit"onclick="updateColor(2, '${cement.id}', '${cement.data().farve}', '${cement.data().hex}', ${cement.data().varenr})">Skift Farve</button>
        </article>
      `;
  }
  htmlTemplate += `
  <article class="cements">
        <img src="img/plus-sign.svg" onclick="addNew(2)">
  </article>
  </div>
  <div class="addnewcement" id="newCement">
  <div class="closenew" id="cementclose" onclick="closeNew(2)"><span></span><span></span></div>
  <input type="text" id="farve-input-cement">
  <div class="hex-color" id="hex-add2">
    <label for="hex4">Vælg en farve</label>
    <input type="color" placeholder="color" oninput="colorChange(4)" value="#c4302b" id="hex4" name="hex4" />
  </div>
  <button onclick="addCement(${newid+1})">Tilføj Cement</button>
  </div>`;
  document.querySelector("#cement").innerHTML = htmlTemplate;
}

//Close Modals
function closeUpdate(i){
  if (i == 1) {
      document.querySelector("#updateMarmor").style.height = "0";
  } else if (i == 2) {
          document.querySelector("#updateCement").style.height = "0";
  }
}
function closeNew(i){
  if (i == 1) {
      document.querySelector("#newMarmor").style.width = "0";
  } else if (i == 2) {
          document.querySelector("#newCement").style.width = "0";
  }
}

//Update Functions ==
function updateColor(i, id, farve, hex, varenr){
  if (i == 1) {
    document.querySelector("#updateMarmor").style.height = "250px";

    document.querySelector("#marmor-input").value = farve;
    document.querySelector("#id-marmor-input").value = id;
    document.querySelector("#varenr-marmor-input").value = varenr;
    document.querySelector("#hex1").value = hex;
    document.querySelector("#hex-marmor").style.background = hex;


  } else if (i == 2) {
    document.querySelector("#updateCement").style.height = "250px";

        document.querySelector("#cement-input").value = farve;
        document.querySelector("#id-cement-input").value = id;
        document.querySelector("#varenr-cement-input").value = varenr;
        document.querySelector("#hex2").value = hex;
        document.querySelector("#hex-cement").style.background = hex;


  }
  console.log(farve, hex, id);
}
function updateMaterial(i){
  if (i == 1) {
    let info = {
      farve: document.querySelector("#marmor-input").value,
      varenr: document.querySelector("#varenr-marmor-input").value,
      id: document.querySelector("#id-marmor-input").value,
      hex: document.querySelector("#hex1").value
    }
    console.log(info);
    _marmorRef.doc(info.id).set({
        farve: info.farve,
        varenr: info.varenr,
        hex: info.hex
    })
  } else if (i == 2) {
      let info = {
        farve: document.querySelector("#cement-input").value,
        varenr: document.querySelector("#varenr-cement-input").value,
        id: document.querySelector("#id-cement-input").value,
        hex: document.querySelector("#hex2").value
      }
      _cementRef.doc(info.id).set({
          farve: info.farve,
          varenr: info.varenr,
          hex: info.hex
      })
      .then(function() {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }
}
function colorChange(i){
  if (i == 1) {
      let hex = document.querySelector(`#hex${i}`);
      hex.addEventListener("change", updateCement, false);
      hex.select();
  } else if (i == 2) {
      let hex = document.querySelector(`#hex${i}`);
      hex.addEventListener("change", updateMarmor, false);
      hex.select();
  } else if (i == 3 ) {
        let hex = document.querySelector(`#hex${i}`);
        hex.addEventListener("change", updateAdd, false);
        hex.select();
  }else if (i == 4 ) {
        let hex = document.querySelector(`#hex${i}`);
        hex.addEventListener("change", updateAddTwo, false);
        hex.select();
  }
}
function updateAdd(event) {
    document.querySelector("#hex-add").style.background = event.target.value;
  };
function updateAddTwo(event) {
      document.querySelector("#hex-add2").style.background = event.target.value;
    };
function updateMarmor(event) {
    document.querySelector("#hex-cement").style.background = event.target.value;
  };
function updateCement(event) {
    document.querySelector("#hex-marmor").style.background = event.target.value;
  };

//Delete Functions ==
function deleteCement(){
    let id = document.querySelector("#id-cement-input").value;
    _cementRef.doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }
function deleteMarmor(){
    let id = document.querySelector("#id-marmor-input").value;
    _marmorRef.doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

// Email funktioner

function appendEmails(emails){
  let htmlTemplate = "";
  for (let email of emails) {
    htmlTemplate += `
      <article class="emails">
        <h2><a href="#specific" onclick="specificEmail('${email.id}')">${email.data().name} (${email.data().tlf})
        </a></h2>
      </article>
    `;
  }
  document.querySelector('#email').innerHTML = htmlTemplate;
  showLoader(false);
}
function specificEmail(id) {
  _emailRef.doc(id).get().then(function(doc) {
    checkEmail(doc)
    checkCement(doc.data().cement, doc.data().marmor);
    showLoader(true)
    setTimeout(function(){
      showEmail();
      showLoader(false);
    }, 1500)
    // checkMarmor(doc);
    // checkCement(doc.data().cement);
    showPage("specific");
  });
}
let information = ["","",""];
function checkEmail(doc){
  let email = {
    email: doc.data().email,
    name: doc.data().name,
    tlf: doc.data().tlf,
    area: doc.data().area,
    circum: doc.data().circum,
  }
  information[0] = email;
}
function checkCement(cementid, marmorid){
_cementRef.where("varenr", "==", cementid).get()
  .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          const info = {
            farve: doc.data().farve,
            hex: doc.data().hex,
            varenr: doc.data().varenr
          }
          information[1] = info;
          console.log(information);
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
  _marmorRef.where("varenr", "==", marmorid).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const info = {
              farve: doc.data().farve,
              hex: doc.data().hex,
              varenr: doc.data().varenr
            }
            information[2] = info;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}
function showEmail(){
  singleEmail(information[0], information[1], information[2])
}
function singleEmail(doc, marmor, cement){
  console.log(information);
  let htmlTemplate = `<article class="emailWrapper">
  <h3>${doc.name} - <a href="mailto:${doc.email}"> ${doc.email}</a></h3>
  <div>
  <p>Gulvets areal er: ${doc.area} kvm</p>
  <p>Gulvets omkreds er: ${doc.circum} m</p>
  </div>
  <p>Kunden vil gerne have gulvets cement til at være denne farve: <span style="color:${cement.hex}; text-transform:capitalize">${cement.farve}</span></p>
  <p>Kunden vil gerne have gulvets marmor til at være denne farve: <span style="color:${marmor.hex}; text-transform:capitalize">${marmor.farve}</span></p>
  <ul>
  <li><h4>Informationer om kunden:</h4></li>
  <li><p>Navn: ${doc.name}</a></p></li>
    <li><p>Tel: <a href="tel:+45${doc.tlf}">${doc.tlf}</a></p></li>
      <li><p>Email: <a href="mailto:${doc.email}">${doc.email}</a></p></li>
  </article>`;
  document.querySelector("#specific").innerHTML = htmlTemplate;
}

// Prices
function appendPrices(prices){
  let htmlTemplate = "";
  for (price of prices) {
    htmlTemplate = `
      <div class="prices">
        <h3> Vores Priser </h3>
      <p>Dyr timepris = <span id="dyrprisInfo">${price.data().dyrpris}</span> <button onclick="updatePrices(1, ${price.data().dyrpris})">Skift Pris</button></p>
      <p>Vores Timepris = <span id="prisInfo">${price.data().pris}</span> <button onclick="updatePrices(2, ${price.data().pris})">Skift Pris</button></p></div>
    `;
  }
  document.querySelector("#priser").innerHTML = htmlTemplate;
}
function updatePrices(i, pris){
  let htmlTemplate = "";
      htmlTemplate += `<div class="updatePrice">
        <input id="pris" type="text" placeholder="${pris}" />
        <button onclick="updatePrice(${i})">Update</button>
      </div>`;
  let priceUpdate = document.querySelector("#priceUpdate");
  priceUpdate.style.height = "150px";
  priceUpdate.innerHTML = htmlTemplate;
}
function updatePrice(i){
  if (i == 1) {
    _prisRef.doc("PyGHM55Vq9RMieMm5V4c").set({
      dyrpris: document.querySelector('#pris').value,
      hrexist: true,
      pris: document.querySelector("#prisInfo").innerHTML
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  } else if (i == 2) {
    _prisRef.doc("PyGHM55Vq9RMieMm5V4c").set({
      dyrpris: document.querySelector("#dyrprisInfo").innerHTML,
      hrexist: true,
      pris: document.querySelector('#pris').value
    })
      .then(function() {
          console.log(document.querySelector("#dyrpris").value);
          console.log("Document successfully written!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
  }

let priceUpdate = document.querySelector("#priceUpdate");
priceUpdate.style.height = "0";

}


//Loader Functions
function showLoader(show) {
  let loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide-loader");
  } else {
    setTimeout(function(){
      loader.classList.add("hide-loader");
    }, 1500);
  }
}
function hideTabbar(hide) {
  let tabbar = document.querySelector('#tabbar');
  if (hide) {
    tabbar.classList.add("hide");
  } else {
    tabbar.classList.remove("hide");
  }
}
