import React, {Fragment} from 'react';
import './App.css';
import {fetchDataNySingle} from "./api/fetchDataNy";
import {getRandomDate} from "./util/datesUtil";
import {fetchDataGr} from "./api/fetchDataGr";
import BookContainer from "./components/BookContainer";
import Footer from "./components/Footer";
import {clearGoodreadsReview} from "./util/stringUtil";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";

class App extends React.Component {
    state = {
        loading: true,
        //0= fiction, 1=non fiction
        bookCategory: Math.floor(Math.random() * 2),
        book: {
            author: "",
            book_image: "",
            description: "",
            grRating: "",
            numPages: "",
            primary_isbn10: "",
            publisher: "",
            reviews: "",
            title: "",
            url: ""
        }
    }

    async componentDidMount() {
        await this.apiCalls();
        console.log("current state")
        console.log(this.state)
        //await fetchDataGr("0316037915")
    }

    async apiCalls() {
        console.log(`3 - state category?`)
        console.log(this.state.bookCategory)
        const bookNy = await fetchDataNySingle(getRandomDate(), this.state.bookCategory)
        const bookGr = await fetchDataGr(bookNy.primary_isbn10)
        this.setState({
            loading: false,
            book: {
                ...bookNy,
                ...bookGr
            }
        })
    }

    handleBookCategory = async (category) => {
        console.log(`1 - handler`)
        console.log(category)
        //this.state.bookCategory = category
        this.setState({
            bookCategory: category,
            loading: true
        }, () => {
            console.log("2 - current state inside handler")
            console.log(this.state)
            this.apiCalls()
        })
        //this.state.loading = true
    }

    render() {
        return (
            <Fragment>
                <Container
                    className={"rounded"}
                    id={"mainContainer"}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{
                        // maxHeight: '100vh',
                        textAlign: 'center',
                    }}>
                    <Loading loading={this.state.loading} message={"Getting your book..."}/>
                    <Row>
                        <Header handler={this.handleBookCategory} current={this.state.bookCategory}/>
                    </Row>
                    <Row>
                        <BookContainer book={this.state.book}/>
                    </Row>

                </Container>
                <Footer/>
            </Fragment>
        );

    }

}

export default App;
