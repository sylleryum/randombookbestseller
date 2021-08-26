import axios from 'axios';
import * as convert from "xml-js";

const endPoint = "https://www.goodreads.com/book/isbn/"
const key = "?key=fXXuZUfpuJYz30B262BBg"
const corsProxy = "https://api.allorigins.win/get?url="

/*
var convert = require('xml-js');
var xml = require('fs').readFileSync('test.xml', 'utf8');
var options = {ignoreComment: true, alwaysChildren: true};
var result = convert.xml2js(xml, options); // or convert.xml2json(xml, options)
console.log(result);
 */

//https://www.goodreads.com/book/isbn/0316037915?key=fXXuZUfpuJYz30B262BBg
export const fetchDataGr = async (isbn) => {
    if (isbn === undefined) {
        return Error("No isbn");
    }
    const url = corsProxy + endPoint + isbn + key
    console.log(`goodreads url ${url}`)
    try {
        const {data} = await axios.get(url);
        const convert = require('xml-js');
        const xml = data.contents
        const options = {compact: true};

        // const parser = new DOMParser().parseFromString(xml, "text/xml")

        const {GoodreadsResponse: {book}} = convert.xml2js(xml, options);
        const result = {
            grRating:book.average_rating._text,
            // grRating: parser.getElementsByTagName("book")[0].children[18].textContent,
            numPages:book.num_pages._cdata,
            // numPages: parser.getElementsByTagName("book")[0].children[19].textContent,
            reviews:book.reviews_widget._cdata,
            // reviews: parser.getElementsByTagName("book")[0].children[27].textContent,
            url:book.url._cdata
            // url: parser.getElementsByTagName("book")[0].children[24].textContent
        }
        // console.log(`fetchDataGr`)
        // console.log(book);
        return result;
    } catch (error) {
        console.log(`error fetchDataGr: ${error}`)
        return error;
    }
}
