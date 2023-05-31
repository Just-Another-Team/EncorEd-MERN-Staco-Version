import '../App.css';
//import logo from '../assets/logo.svg';

import { Container, Row } from "react-bootstrap"
import React, { useState } from "react"
import { useRegister } from "../hooks/useRegister"


const Register = () => {
    const [userFirstname, setFirstname] = useState('')
    const [userLastname, setLastname] = useState('')
    const [userRole, setRole] = useState('')
    const [userEmail, setEmail] = useState('')
    const [userPassword, setPassword] = useState('')
    const {register, isLoading, error } = useRegister()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await register(userFirstname, userLastname, userRole, userEmail, userPassword)
    }

    return(
        <Container fluid className='mx-0 px-0' style={{overflow: "hidden"}}>
            <Row style = {{ backgroundColor:'#45A1FD'}}>
                <div className="Auth-form-container">
                    <form className="Auth-form" onSubmit={handleSubmit}>
                        <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Create Account</h3>
                        <div className="form-group mt-3">
                            <label>First Name</label>
                            <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Jane"
                            onChange={(e) => setFirstname(e.target.value)}
                            value={userFirstname}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Last Name</label>
                            <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Doe"
                            onChange={(e) => setLastname(e.target.value)}
                            value={userLastname}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Role</label>
                            <select className='form-control mt-1' name="role" onChange={(e) => setRole(e.target.value)}>
                                <option>Choose role</option>
                                <option value="Student">Student</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Registrar">Registrar</option>  
                            </select>
                            {/* <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Student"
                            onChange={(e) => setRole(e.target.value)}
                            value={userRole}
                            /> */}
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                            value={userEmail}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={userPassword}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary" disabled ={isLoading}>
                            Submit
                            </button>
                            {error && <div className ="error">{error}</div>}
                        </div>
                        <p className="text-center mt-2">
                            Already have an account? <a href="login">Login</a>
                        </p>
                        </div>
                    </form>
                </div>
            </Row>
        </Container>
    )
}

export { Register }