function showLoader(show) {
  let loader = document.querySelector('#loader');
  if (show) {
      loader.classList.remove("hide");
  } else {
    setTimeout(function() {
    loader.classList.add("hide");
  }, 1500);
  }
}
