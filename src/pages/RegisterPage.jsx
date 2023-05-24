import '../App.css';
import logo from '../assets/logo.svg';

import { Container, Row, Col } from "react-bootstrap"
import { TopNav } from '../components/NavBar';
import React, { useState } from "react"



const Register = () => {
    return(
        <>
            <Container fluid className='mx-0 px-0' style={{overflow: "hidden"}}>
                <TopNav />
                <Row style = {{ backgroundColor:'#45A1FD'}}>
                    <div className="Auth-form-container">
                        <form className="Auth-form">
                            <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Create Account</h3>
                            <div className="form-group mt-3">
                                <label>First Name</label>
                                <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="e.g Jane"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Last Name</label>
                                <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="e.g Doe"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Role</label>
                                <input
                                type="text"
                                className="form-control mt-1"
                                placeholder="e.g Student"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Email address</label>
                                <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Email Address"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Password"
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                Submit
                                </button>
                            </div>
                            <p className="text-center mt-2">
                                Already have an account? <a href="login">Login</a>
                            </p>
                            </div>
                        </form>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export { Register }