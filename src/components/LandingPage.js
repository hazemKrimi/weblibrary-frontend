import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const LandingPage = () => (
    <Jumbotron className="container text-center">
        <h2>Welcome to the place where Knowledge is shared Freely</h2>
        <p>WebLibrary is a platform where Authors and Readers meet to share Value in the form of Books</p>
        <div className="mt-2">
            <Button className="btn-block m-auto" style={{width: "50%", fontWeight: "bold"}}>
                <Link to="/signup">Get Started</Link>
            </Button>
        </div>
    </Jumbotron>
);

export default LandingPage;