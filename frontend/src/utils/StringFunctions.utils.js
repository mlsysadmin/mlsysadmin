'use strict'

const CapitalizeString = (word) => {
  
    let capitalize = word.charAt(0).toUpperCase();
    

    let sliceConcat = capitalize + word.slice(1);
    
    return sliceConcat;
}

const NotAvailableReturn = (detail) => {

    let isAvailable = detail ? detail : <span style={{ fontStyle: 'italic' }}>N/A</span>;

    return isAvailable;
}

function isPastAMonth(date) {
    if (!date) {
      return false
    }

    function getDaysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    }

    const today = new Date();
    const creationDate = new Date('2024-09-10');
    // const creationDate = new Date(date);

    const timeDifference = today - creationDate; // difference in milliseconds
    
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    
    return daysDifference > getDaysInMonth(today.getFullYear(), today.getMonth()); // Property is past 30 days created - true

  }

  const GetPropertyTitle = (projectName, unitName) => {
		
    const project_name = projectName.includes("NA".toLocaleLowerCase()) || projectName ? "" : projectName;

    return `${project_name} ${unitName}`.trim()

}

const FillLocationFilter = (listings) => {
  
  try {
    const distinctCity = listings.filter((value, index, self) =>
      index === self.findIndex((t) => t.city === value.city)).map((item, i) => {
        return {
          label: item.city.toLowerCase().includes("city") ? `${CapitalizeString(item.city.toLowerCase().replace('city', ""))}City` : `${CapitalizeString(item.city.toLowerCase())} City`,
          value: item.city.toLocaleLowerCase().replace('city', "").trim()
        }
      }).sort((a, b) => a.value.localeCompare(b.value))

    // setFilterLocation(distinctCity);
    return distinctCity;

  } catch (error) {
    console.log("location", error);
    return [];
  }
}

export {
    CapitalizeString,
    NotAvailableReturn,
    isPastAMonth,
    GetPropertyTitle,
    FillLocationFilter
}