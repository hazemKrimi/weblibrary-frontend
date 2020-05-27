import React, { useState } from 'react';
import { Jumbotron, Form, FormGroup, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import auth from './Auth';

const SignUp = () => {
    const [creds, setCreds] = useState({ username: "", email: "", password: "", type: "" });

    const handleChange = event => {
        setCreds({...creds, [event.target.name]: event.target.value});
    };

    const signUp = async event => {
        event.preventDefault();
        let res = await auth.signup(creds);
        if (res) window.location.replace("/login");
        else {
            setCreds({ username: "", email: "", password: "", type: "" });
            alert("Sign Up Failed");
        }
    };

    return !auth.getSession() ? (
        <Jumbotron className="container">
            <Form>
                <h2>Sign Up</h2>
                <FormGroup>
                    <Input type="text" name="username" placeholder="Username" required value={creds.username} onChange={event => handleChange(event)} />
                </FormGroup>
                <FormGroup>
                    <Input type="email" name="email" placeholder="Email" required value={creds.email} onChange={event => handleChange(event)} />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="password" placeholder="Password" required value={creds.password} onChange={event => handleChange(event)} />
                </FormGroup>
                <FormGroup>
                    <select name="type" className="form-control" value={creds.type} onChange={event => handleChange(event)}>
                        <option value="">Select Account Type, Reader by Default</option>
                        <option value="author">Author</option>
                        <option value="reader">Reader</option>
                    </select>
                </FormGroup>
                <FormGroup>
                    <Button onClick={event => signUp(event)}>Sign Up</Button>
                </FormGroup>
            </Form>
        </Jumbotron>
    ) : (
        <Redirect to="/home"/>
    );
};

export default SignUp;