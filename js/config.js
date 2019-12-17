'use strict'
var firebaseConfig = {
    apiKey: "AIzaSyClW0au151VUipGXnuZ7lbaLXc1TAB9ibs",
    authDomain: "carsten-laursen.firebaseapp.com",
    databaseURL: "https://carsten-laursen.firebaseio.com",
    projectId: "carsten-laursen",
    storageBucket: "carsten-laursen.appspot.com",
    messagingSenderId: "956179594717",
    appId: "1:956179594717:web:580b36a65f7fb280888a34",
    measurementId: "G-PDRV1LZTT6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const _db = firebase.firestore();
