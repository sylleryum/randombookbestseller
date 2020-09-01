export const getTodayDataFormatted = () => {
    const date = new Date();
    const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
        .toISOString()
        .split("T")[0];
    return dateString
};

/**
 * returns a random date to be used for list of fiction or non fiction ny times books API call
 * @returns {string|*}
 */
export const getRandomDate = () => {
    //new Date().getFullYear()
    const dates = ["2008-06-08"]
    for(let i=2009;i<=new Date().getFullYear();i++){
        dates.push(i+"-01-01")
    }
    const randomPublicationDate = dates[Math.floor(Math.random() * dates.length)]
    //console.log(`getRandomDate() = randomPublicationDate ${randomPublicationDate}`)
    return randomPublicationDate
}