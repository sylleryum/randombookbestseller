import axios from 'axios';
import {getTodayDataFormatted} from "../util/datesUtil";
import * as https from "https";

const endPoint = 'https://api.nytimes.com/svc/books/v3';
const fiction = (date) => `/lists/${date}/Hardcover fiction.json`
const nonFiction = (date) => `/lists/${date}/Hardcover nonfiction.json`
const key = '?api-key=yIY9ATTla1XKYKfDb1cb9pMz4kXKMiJK'
//available publications: https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=yIY9ATTla1XKYKfDb1cb9pMz4kXKMiJK

/**
 *
 * @param date of the publication, should be in the format yyyy-mm-dd (getTodayDataFormatted() or getRandomDate() can be used to get it)
 * @param category 0 for fiction, 1 for non fiction
 * @returns {Promise<[books]>}
 */
export const fetchDataNyYear = async (date, category) => {
    if (date === undefined) {
        date = getTodayDataFormatted();
    }
    console.log(`4 - category fetchdatanyyear`)
    console.log(category)
    console.log(category == 0 ? true : false)
    const url = category == 0 ? endPoint + fiction(date) + key : endPoint + nonFiction(date) + key
    //url = endPoint + fiction(date) + key;
    console.log("-url: " + url + " category: " + category)

    try {
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        const {data: {results: {books}}} = await axios.get(url, { httpsAgent: httpsAgent });
        return books.map((i) => {
            // console.log(`fetchdatanyyear`)
            // console.log(i)
            return {

                primary_isbn10: i.primary_isbn10,
                publisher: i.publisher,
                description: i.description,
                title: i.title,
                author: i.author,
                book_image: i.book_image
            }
        });
    } catch (error) {
        console.log(`error fetchDataNy: ${error}`)

        return error;
    }
}

/**
 *
 * @param date of the publication, should be in the format yyyy-mm-dd (getTodayDataFormatted() or getRandomDate() can be used to get it)
 * @param category 0 for fiction, 1 for non fiction
 * @returns {Promise<books>} single book
 */
export const fetchDataNySingle = async (date, category) => {
    //this.state.books[Math.floor(Math.random() * this.state.books.length)].title
    const result = await fetchDataNyYear(date, category)

    return result[Math.floor(Math.random() * result.length)]
};
