import React, { useState } from 'react';
import { Jumbotron, Form, FormGroup, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import auth from './Auth';

const Settings = () => {
    const [creds, setCreds] = useState({ username: "", email: "", password: "" });

    const handleChange = event => {
        setCreds({ ...creds, [event.target.name]: event.target.value });
    };

    const update = async(event, creds) => {
        event.preventDefault();
        let res = await auth.updateUser(creds.username, creds.email, creds.password);
        if (res === true) {
            setCreds({ username: "", email: "", password: "" });
            alert("User Update Successful");
        }
        else {
            setCreds({ username: "", email: "", password: "" });
            alert("User Update Failed");
        }
    }

    const del = async(event) => {
        event.preventDefault();
        let res = await auth.deleteUser();
        if (res) {
            localStorage.removeItem("jwt");
            window.location.replace("/");
        } else alert("User Deletion Failed");
    }

    return auth.getSession() ? (
        <Jumbotron className="container">
            <h1>Account Settings for <b>{auth.getSession().username}</b>:</h1>
            <Form>
                <h2>Update Account</h2>
                <p>To change a credential enter a new one, else leave it empty (Always fill the username for Confirmation)</p>
                <FormGroup>
                    <Input type="text" name="username" placeholder="New Username" required value={creds.username} onChange={event => handleChange(event)} />
                </FormGroup>
                <FormGroup>
                    <Input type="email" name="email" placeholder="New Email" required value={creds.email} onChange={event => handleChange(event)} />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="password" placeholder="New Password" required value={creds.password} onChange={event => handleChange(event)} />
                </FormGroup>
                <FormGroup>
                    <Button onClick={event => update(event, creds)}>Update</Button>
                </FormGroup>
            </Form>
            <Form>
                <h2>Delete Account</h2>
                <p>If you proceed you cannot recover your account</p>
                <Button onClick={event => del(event, auth.getSession().id)}>Delete</Button>
            </Form>
        </Jumbotron>
    ) : (
        <Redirect to="/login" />
    );
};

export default Settings;