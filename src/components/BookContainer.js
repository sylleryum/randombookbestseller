import React from 'react';
import {clearGoodreadsReview} from "../util/stringUtil";
import {Card} from "react-bootstrap";

const BookContainer = (props) => {
    return (

        <Card className={"w-75 mx-auto card-no-border"}>
            <Card.Img className={"card-img-top mx-auto"} src={props.book.book_image}/>
            <Card.Body>
                <Card.Title><a target="_blank" href={props.book.url}>Title: {props.book.title}</a></Card.Title>
                <Card.Text>
                    Author: {props.book.author}<br/>
                    Rating: {props.book.grRating}<br/>
                    Pages: {props.book.numPages}<br/>
                </Card.Text>

                <Card.Text>Description: {props.book.description}</Card.Text>
                <Card.Text dangerouslySetInnerHTML={{__html: clearGoodreadsReview(props.book.reviews)}}/>
            </Card.Body>
        </Card>

        // <div>
        //     <div className={"coverDiv"}><img className={"bookCover"} src={props.book.book_image}/></div>
        //     <div>Title: {props.book.title}</div>
        //     <div>Author: {props.book.author}</div>
        //     <div>Pages: {props.book.numPages}</div>
        //     <div>Description: {props.book.description}</div>
        //     <div>Rating: {props.book.grRating}</div>
        //     <div>Goodreads Url: <a href={props.book.url}>{props.book.url}</a></div>
        //     <div dangerouslySetInnerHTML={{__html: clearGoodreadsReview(props.book.reviews)}}/>
        // </div>
    );
};

export default BookContainer;
