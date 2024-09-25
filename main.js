import "./style.css";

//insert images into image-holder
const imageHolder = document.getElementById("image-holder");
const images = import.meta.glob("./images/*");
for (const imageUrl in images) {
  const image = document.createElement("img");
  image.classList.add("image");
  image.src = imageUrl;
  imageHolder.appendChild(image);
}
//add an additional copy of first image to end
const firstImageCopy = document.createElement("img");
firstImageCopy.classList.add("image");
firstImageCopy.src = Object.keys(images)[0];
imageHolder.appendChild(firstImageCopy);

//variables
let currentIndex = 0;
let pauseTransition = false;
const numberOfImages = Object.keys(images).length + 1;

//slideplayer
const intervalId = setInterval(autoTranslate, 2000);

//left/right arrows
const leftArrow = document.getElementById("left-arrow");
leftArrow.addEventListener("click", (e) => {
  if (currentIndex === 0) {
    currentIndex = numberOfImages - 1;
  }
  const startIndex = currentIndex;
  currentIndex = (currentIndex - 1) % numberOfImages;
  translateImageHolder(startIndex, currentIndex);
});
leftArrow.addEventListener("mouseover", (e) => {
  pauseTransition = true;
});
leftArrow.addEventListener("mouseout", (e) => {
  pauseTransition = false;
});

//functions
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
}
