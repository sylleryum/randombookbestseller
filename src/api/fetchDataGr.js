import axios from 'axios';
import * as convert from "xml-js";

const endPoint = "https://www.goodreads.com/book/isbn/"
const key = "?key=fXXuZUfpuJYz30B262BBg"
const corsProxy = "https://cors-anywhere.herokuapp.com/"

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
        const xml = data
        const options = {compact: true};
        const {GoodreadsResponse:{book}} = convert.xml2js(xml, options);
        const result = {
            grRating:book.average_rating._text,
            numPages:book.num_pages._cdata,
            reviews:book.reviews_widget._cdata,
            url:book.url._cdata
        }
        // console.log(`fetchDataGr`)
        // console.log(book);
        return result;
    } catch (error) {
        console.log(`error fetchDataGr: ${error}`)
        return error;
    }
}