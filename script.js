const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const container = document.querySelector("#slides-container");
const load = document.querySelector("#load");

let image;

const avatar = [
  "810438?v=4",
  "3624098?v=4",
  "499550?v=4",
  "36901?v=4",
  "120859?v=4",
];
//
function fetchBlob(i) {
  let url = "https://avatars.githubusercontent.com/u/" + avatar[i];
  load.setAttribute("class", "loading");
  fetch(url)
    .then((response) => {
      return response.blob();
    })
    .then((myBlob) => {
      let objectURL = URL.createObjectURL(myBlob);
      image = document.createElement("img");
      image.src = objectURL;
      load.setAttribute("class", "loaded");
      container.appendChild(image);
    })

    .catch((error) => {
      console.log(
        "There has been a problem with your fetch operation: " + error.message
      );
    });
}

let activeSlideNumber = 0;
fetchBlob(activeSlideNumber);

function showNextAvatar() {
  if (activeSlideNumber == 4) {
    activeSlideNumber = 0;
  } else {
    activeSlideNumber = activeSlideNumber + 1;
  }
  showSlide(activeSlideNumber);
}

function showPreviousAvatar() {
  if (activeSlideNumber == 0) {
    activeSlideNumber = 4;
  } else {
    activeSlideNumber = activeSlideNumber - 1;
  }
  showSlide(activeSlideNumber);
}

function hideActiveSlide() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function showSlide(i) {
  hideActiveSlide();
  fetchBlob(i);
}

next.addEventListener("click", showNextAvatar);
prev.addEventListener("click", showPreviousAvatar);
