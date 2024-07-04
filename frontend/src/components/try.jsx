const [currentIndex, setCurrentIndex] = React.useState(0);
const [smallImages, setSmallImages] = React.useState([livingroom, bathroom]); // Initial small images
const [photoCount, setPhotoCount] = React.useState(18); // Initial photo count

const images = [bedroom, image701, image702, image703, image704, image705];

const previousImage = () => {
  const newIndex = (currentIndex - 1 + images.length) % images.length;
  setCurrentIndex(newIndex);
  updateSmallImages(newIndex);
};

const nextImage = () => {
  const newIndex = (currentIndex + 1) % images.length;
  setCurrentIndex(newIndex);
  updateSmallImages(newIndex);
};

const updateSmallImages = (newIndex) => {
  // Ensure small images do not repeat and cycle through unique images
  const newSmallImages = [
    images[newIndex], // Main image
    images[(newIndex + 1) % images.length] // Next image in the list
  ];
  setSmallImages(newSmallImages);

  // Update photo count based on new index if necessary
  const newPhotoCount = 18; // Update this with appropriate logic for each main image
  setPhotoCount(newPhotoCount);
};

return (
  <div>
    <button onClick={previousImage}>Previous</button>
    <img src={images[currentIndex]} alt="Main" />
    <button onClick={nextImage}>Next</button>
    <div>
      {smallImages.map((img, index) => (
        <img key={index} src={img} alt={`Small ${index}`} />
      ))}
    </div>
    <p>Photo Count: {photoCount}</p>
  </div>
);
