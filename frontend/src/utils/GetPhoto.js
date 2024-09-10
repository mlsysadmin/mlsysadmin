const GetPhotoFromDB = (data) => {
  try {
    const url = process.env.REACT_APP_STORAGE_BUCKET_URL;
    const objectname = process.env.REACT_APP_OBJECT_NAME;

    if (data) {
      const parsedData = JSON.parse(data);
      return `${url}${objectname}/${parsedData[0].photo}`;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

const GetPhotoLength = (data) => {
  try {
    if (data) {
      const parsedData = JSON.parse(data);
      const datalength = parsedData.length;
      return datalength;
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
      // console.log('Parsed data:', parsedData);
      // console.log( "parse photo", parsedData[0].photo);
      
      // return `${url}${objectname}/${parsedData}`;
      return `images, ${images}`;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export { GetPhotoFromDB, GetPhotoLength, GetAllPhoto };
