import React from "react";

export const clearGoodreadsReview = (reviews) => {
    return reviews.substring(reviews.indexOf('<iframe'))
}

export const stringToHtml = (theString) => {
    return <div dangerouslySetInnerHTML={{__html: theString}}/>
}