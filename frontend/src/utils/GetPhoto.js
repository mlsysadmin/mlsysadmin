const GetPhotoFromDB = (data) => {
  try {
    const url = process.env.REACT_APP_STORAGE_BUCKET_URL;
    const objectname = process.env.REACT_APP_OBJECT_NAME;

    if (data) {
      const parsedData = JSON.parse(data);
      console.log("datalength:", parsedData.length);
      return `${url}${objectname}/${parsedData[0].photo}`;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error parsing data:", error);
    return null;
  }
};

const GetPhotoLength = (data) => {
  try {
    if (data) {
      const parsedData = JSON.parse(data);
      const datalength = parsedData.length;
      console.log("datalength", datalength);
      return datalength;
    } else {
      return 0;
    }
  } catch (error) {
    console.log("Error parsing data:", error);
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
      console.log("datalength:", parsedData.length);
      // console.log('Parsed data:', parsedData);
      // console.log( "parse photo", parsedData[0].photo);
      console.log("imgdata",`${url}${objectname}/${parsedData.photo}`);
      
      // return `${url}${objectname}/${parsedData}`;
      return `images, ${images}`;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Error parsing data:", error);
    return null;
  }
};

export { GetPhotoFromDB, GetPhotoLength, GetAllPhoto };
