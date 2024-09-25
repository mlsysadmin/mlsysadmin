import { GetUnitPhotos } from "../api/GetAllPublicListings";
import DefaultPropertyImage from '../asset/fallbackImage.png';

const GetPhotoWithUrl = (photoPath) => {
  try {
    const url = process.env.REACT_APP_IGOT_API_URL;

    if (photoPath) {
      return `${url}/${photoPath}`;
    } else {
      return DefaultPropertyImage;
    }
  } catch (error) {
    return DefaultPropertyImage;
  }
};

// unitId = property id
const GetPhotoLength = (unitId) => {
  try {
    
    if (unitId) {

      let photoLength = 0

      GetUnitPhotos(unitId).then((data) => {
        
        photoLength = data.length;
        
      }).catch(err => {
        photoLength = 0;
      });
      
      return photoLength;

    } else {
      return 0;
    }
  } catch (error) {
    return 0;
  }
};

const GetAllPhoto = (oneListing) => {
  const url = process.env.REACT_APP_STORAGE_BUCKET_URL;
  const objectname = process.env.REACT_APP_OBJECT_NAME;
  try {
    if (oneListing) {
      const parsedData = JSON.parse(oneListing);
      const images = parsedData.map(img => (
        `${url}${objectname}/${img.photo}`
      ))

      return `images, ${images}`;

    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export { GetPhotoWithUrl, GetPhotoLength, GetAllPhoto };
