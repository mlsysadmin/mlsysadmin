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

module.exports = {
    StringToArray,
    ToPascalCase
}