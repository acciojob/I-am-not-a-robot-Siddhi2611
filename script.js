//your code here
const images = ["img1", "img2", "img3", "img4", "img5"];
const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");

let selectedImages = [];

// Utility to shuffle an array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Load images with one duplicate
function loadImages() {
  imageContainer.innerHTML = "";
  selectedImages = [];
  message.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  // Choose one random duplicate
  const duplicate = images[Math.floor(Math.random() * images.length)];
  let pool = [...images, duplicate];

  // Shuffle
  pool = shuffle(pool);

  // Create image elements
  pool.forEach(cls => {
    const img = document.createElement("img");
    img.classList.add(cls);
    img.dataset.type = cls;
    img.addEventListener("click", () => selectImage(img));
    imageContainer.appendChild(img);
  });
}

// Handle image selection
function selectImage(img) {
  if (selectedImages.length === 2 || img.classList.contains("selected")) {
    return; // do not allow more than 2 or double click same image
  }
  img.classList.add("selected");
  selectedImages.push(img);

  resetBtn.style.display = "inline-block";

  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// Reset function
resetBtn.addEventListener("click", () => {
  loadImages();
});

// Verify function
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";
  if (selectedImages[0].dataset.type === selectedImages[1].dataset.type) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// Initialize on page load
loadImages();
