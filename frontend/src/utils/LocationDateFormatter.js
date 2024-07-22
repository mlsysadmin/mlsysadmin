const DateFormatter = (dataString) =>{
    const date = new Date(dataString);
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}-${day}-${year}`
}
const LocationFormatter = (location) =>{
    return `${location.city}, ${location.province}`
    
}
export {DateFormatter, LocationFormatter}