import React, { useState } from 'react';
import { Jumbotron, Form, FormGroup, Input, Button, Row, Col } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import auth from './Auth';

const Login = () => {
    const [creds, setCreds] = useState({ email: "", password: "" });

    const handleChange = event => {
        setCreds({ ...creds, [event.target.name]: event.target.value });
    };

    const login = async event => {
        event.preventDefault();
        let res = await auth.login(creds);
        if (res) window.location.replace("/home");
        else {
            setCreds({ email: "", password: "" });
            alert("Login Failed");
        }
    };

    return !auth.getSession() ? (
        <Jumbotron className="container">
            <Form>
                <h2>Login</h2>
                <FormGroup>
                    <Input type="email" name="email" placeholder="Email" required value={creds.email} onChange={event => handleChange(event)} />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="password" placeholder="Password" required value={creds.password} onChange={event => handleChange(event)} />
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs="6">
                            <Button onClick={event => login(event)}>Login</Button>
                        </Col>
                        <Col xs="6">
                            <p style={{ textAlign: "right" }}>
                                Don't have an Account? <Link style={{ color: "#007bff"}} to="/signup">Sign Up</Link>
                            </p>
                        </Col>
                    </Row>
                </FormGroup>
            </Form>
        </Jumbotron>
    ) : (
        <Redirect to="/home"/>
    );
};

export default Login;