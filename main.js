import "./style.css";

const imageHolder = document.getElementById("image-holder");
const images = import.meta.glob("./images/*");
for (const imageUrl in images) {
  const image = document.createElement("img");
  image.classList.add("image");
  image.src = imageUrl;
  imageHolder.appendChild(image);
}
const firstImageCopy = document.createElement("img"); //extra copy of first image added to end
firstImageCopy.classList.add("image");
firstImageCopy.src = Object.keys(images)[0];
imageHolder.appendChild(firstImageCopy);

const numberOfImages = Object.keys(images).length + 1;

/*------------
  Variables
------------*/
let currentIndex = 0;
let pauseTransition = false;

//slideplayer
const intervalId = setInterval(autoTranslate, 2000);

/*-----------------
  Event Listeners
------------------*/

const pauseElements = document.querySelectorAll(".pause-transition");
for (const element of pauseElements) {
  element.addEventListener("mouseover", (e) => {
    pauseTransition = true;
  });
  element.addEventListener("mouseout", (e) => {
    pauseTransition = false;
  });
}

const leftArrow = document.getElementById("left-arrow");
leftArrow.addEventListener("click", (e) => {
  if (currentIndex === 0) {
    currentIndex = numberOfImages - 1;
  }
  const startIndex = currentIndex;
  currentIndex = (currentIndex - 1) % numberOfImages;
  translateImageHolder(startIndex, currentIndex);
});

const rightArrow = document.getElementById("right-arrow");
rightArrow.addEventListener("click", (e) => {
  if (currentIndex === numberOfImages - 1) {
    currentIndex = 0;
  }
  const startIndex = currentIndex;
  currentIndex = (currentIndex + 1) % numberOfImages;
  translateImageHolder(startIndex, currentIndex);
});

const navCircleElements = [];
const navCirclesHolder = document.getElementById("nav-circles-holder");
for (let i = 0; i < numberOfImages - 1; i++) {
  const navCircle = document.createElement("img");
  navCircle.src = "./circle.svg";
  navCircle.classList.add("nav-circle");
  navCircle.addEventListener("click", (e) => {
    highlightNavCircle(i);
    let startIndex = currentIndex;
    currentIndex = i;
    translateImageHolder(startIndex, currentIndex);
  });
  navCirclesHolder.appendChild(navCircle);
  navCircleElements.push(navCircle);
}

/*------------
  Functions
------------*/
function autoTranslate() {
  if (!pauseTransition) {
    if (currentIndex === numberOfImages - 1) {
      currentIndex = 0;
    }
    const startIndex = currentIndex;
    currentIndex = (currentIndex + 1) % numberOfImages;
    translateImageHolder(startIndex, currentIndex);
  }
}

function translateImageHolder(startIndex, endIndex) {
  const testTransform = [
    {
      transform: `translateX(calc(var(--frame-width) * -${startIndex}))`,
    },
    {
      transform: `translateX(calc(var(--frame-width) * -${endIndex}))`,
    },
  ];

  const testTransformTiming = {
    duration: 1000,
    fill: "forwards",
  };

  imageHolder.animate(testTransform, testTransformTiming);
  highlightNavCircle(endIndex);
}

function highlightNavCircle(selectedIndex) {
  if (selectedIndex === numberOfImages - 1) {
    selectedIndex = 0;
  }
  navCircleElements.forEach((navCircle, navIndex) => {
    if (selectedIndex === navIndex) {
      navCircle.classList.add("nav-circle-selected");
    } else {
      navCircle.classList.remove("nav-circle-selected");
    }
  });
}
