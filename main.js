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
console.log(Object.keys(images)[0]);
firstImageCopy.src = Object.keys(images)[0];
imageHolder.appendChild(firstImageCopy);

//variables
let currentIndex = 0;
const numberOfImages = Object.keys(images).length + 1;

//slideplayer
const intervalId = setInterval(autoTranslate, 2000);

//left/right arrows

//functions
function autoTranslate() {
  if (currentIndex === numberOfImages - 1) {
    currentIndex = 0;
  }
  const startIndex = currentIndex;
  currentIndex = (currentIndex + 1) % numberOfImages;
  console.log(`now ${currentIndex}`);
  translateImageHolder(startIndex, currentIndex);
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
