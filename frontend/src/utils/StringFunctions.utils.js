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

export {
    CapitalizeString,
    NotAvailableReturn,
    isPastAMonth,
    GetPropertyTitle
}