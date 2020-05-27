import React, { useState, useEffect } from 'react';
import { Jumbotron, Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import auth from './Auth';

const Home = () => {
    const [books, setBooks] = useState([]);

    const del = async(id, path) => {
        let res = await auth.deleteBook(id, path);
        if (res) window.location.reload();
        else alert("Book Deletion Failed");
    }

    useEffect(() => {
        const fetchBooks = async() => {
            let res = await auth.listBooks();
            if (!res.message) res.forEach(book => setBooks(books => ([...books, book])));
        }
        fetchBooks();
    }, []);

    return auth.getSession() ? (
        <Jumbotron className="container">
            {books[0] ? <h1>Books:</h1> : <h1>No Books Found</h1>}
            {books && books.map(book => (
                <Row key={book.id} className="my-2">
                    <Col>
                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <h3>Title: {book.name}</h3>
                                </CardTitle>
                                <CardSubtitle>Author: {book.authorId === auth.getSession().id ? "You" : book.authorName}</CardSubtitle>
                                <div className="mt-2">
                                    <Button>
                                        <a href={`http://localhost/web_library${book.path}`} target="_blank" rel="noopener noreferrer">Read</a>
                                    </Button>
                                    {book.authorId === auth.getSession().id && 
                                        <Button className="ml-2" onClick={event => del(book.id, book.path)}>Delete</Button>
                                    }
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            ))}
        </Jumbotron>
    ) : (
        <Redirect to="/login"/>
    );
};

export default Home;