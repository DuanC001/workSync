function formatDate(dateStr) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  
    const match = dateStr.match(/^\d{4}-\d{2}-\d{2}$/);

    // console.log("match :",match);
    if (match) {
        const parts = dateStr.split('-');
        const monthNumber = parseInt(parts[1], 10);
        return monthNames[monthNumber - 1]; 
    }
   
    const parts = dateStr.split(',').map(part => part.trim());

   
    const monthName = parts[1];

   
    const monthIndex = monthNames.indexOf(monthName);

    if (monthIndex === -1) {
        const parts = dateStr.split(' ').map(part => part.trim());
        // console.log("parts :",parts);
        const newIndex = monthNames.indexOf(parts[1]);
        if (newIndex === -1) {
            const date = new Date(dateStr);
            let isoIndex = date.getMonth();
        
            if(isoIndex === -1 || isoIndex === undefined || isoIndex === null){
                return 'Invalid month';
            }
            return monthNames[isoIndex];
            // console.log()
            // return 'Invalid month';

        }
        return monthNames[newIndex];
    }


    return monthNames[monthIndex];
}

// const dateStrings = ['08, March 2024', '05, March, 2024'];
/* dateStrings.forEach(dateStr => {
    console.log(`Month for ${dateStr}:`, formatDate(dateStr));
}); */

export default formatDate;