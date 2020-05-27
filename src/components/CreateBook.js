import React, { useState } from 'react';
import { Jumbotron, Form, FormGroup, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import auth from './Auth';

const CreateBook = () => {
    const [creds, setCreds] = useState({ name: "" });

    const handleChange = event => {
        setCreds({ ...creds, [event.target.name]: event.target.value });
    };

    const createBook = async event => {
        event.preventDefault();
        let res = await auth.createBook(creds);
        if (res === true) window.location.replace("/home");
        else {
            setCreds({ name: "" });
            alert(res);
        }
    }

    if (!auth.getSession()) return (
        <Redirect to="/login" />
    );

    return auth.getSession().type === "author" ? (
        <Jumbotron className="container">
            <Form>
                <h2>Create Book</h2>
                <p>Max File Size: 10 MB</p>
                <FormGroup>
                    <Input type="text" name="name" placeholder="Name" required value={creds.name} onChange={event => handleChange(event)} />
                </FormGroup>
                <FormGroup>
                    <Input type="file" name="book" id="file" required />
                </FormGroup>
                <FormGroup>
                    <Button onClick={event => createBook(event)}>Create</Button>
                </FormGroup>
            </Form>
        </Jumbotron>
    ) : (
        <Jumbotron className="container">
            <h2>You must be an Author to Create Books</h2>
        </Jumbotron>
    );
};

export default CreateBook;