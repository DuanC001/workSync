function calculateQuarter(monthName) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    // Check if monthName is not a string
    if (typeof monthName !== 'string') {
        throw new Error('Invalid month name');
    }

    // console.log("monthName :",monthName);

    let index = monthNames.indexOf(monthName);
    console.log("index :",index);
    index = index === -1 ? monthNames.indexOf(monthName.charAt(0).toUpperCase() + monthName.slice(1)) : index;



    if (index === -1) {
        throw new Error('Invalid month name');
    }

    if (index >= 0 && index <= 2) {
        return 1;
    } else if (index >= 3 && index <= 5) {
        return 2;
    } else if (index >= 6 && index <= 8) {
        return 3;
    } else {
        return 4;
    }
}

export default calculateQuarter;
