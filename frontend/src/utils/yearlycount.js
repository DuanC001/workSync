
function extractYear(dateStr) {
    const parts = dateStr.split(',').map(part => part.trim());

    const year = parseInt(parts[2], 10);

    return year;
}


export default extractYear;