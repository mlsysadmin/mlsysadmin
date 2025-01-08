
'use strict'
const axios = require('axios');
const StringToArray = (value, separator) => {
  try {

    return value.split(separator);

  } catch (error) {
    throw error
  }
}

const ToPascalCase = (word) => {
  try {
    let capitalizeEachWord = "";

    if (word === undefined) {
      capitalizeEachWord = "";
    } else {
      let w = ""
      word.trim().replace(/[\_-]/g, " ").split(' ').forEach((st) => {
        w += CapitalizeString(st) + " ";
      })

      capitalizeEachWord = w
    }
    console.log(capitalizeEachWord);

    capitalizeEachWord.trim();

    return capitalizeEachWord;
  } catch (error) {
    return word
  }

}
// Function to encode image as Base64
async function encodeImageUrlToBase64(imageUrl) {
  try {
    // Fetch the image as binary data
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Convert binary data to Base64
    const base64 = Buffer.from(response.data).toString('base64');
    console.log(response.headers);

    // Return the Base64 with MIME type
    return `data:${response.headers['content-type']};base64,${base64}`;
  } catch (error) {
    console.error('Error encoding image to Base64:', error.message);
    return null;
  }
}

module.exports = {
  StringToArray,
  ToPascalCase,
  encodeImageUrlToBase64
}