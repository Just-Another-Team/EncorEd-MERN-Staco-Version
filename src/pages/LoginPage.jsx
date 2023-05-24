import '../App.css';
//import logo from '../assets/logo.svg';

import { Container, Row} from "react-bootstrap"
import { TopNav } from '../components/NavBar';
import React, { useState } from "react"
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [userEmail, setEmail] = useState('')
    const [userPassword, setPassword] = useState('')
    const {login, isLoading, error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(userEmail, userPassword)
    }


    return(
        <>
            <Container fluid className='mx-0 px-0' style={{overflow: "hidden"}}>
                <TopNav />
                <Row style = {{ backgroundColor:'#45A1FD'}}>
                    <div className="Auth-form-container">
                        <form className="Auth-form" onSubmit={handleSubmit}>
                            <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Sign In</h3>
                            <div className="form-group mt-3">
                                <label>Email address</label>
                                <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={userEmail}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={userPassword}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                Submit
                                </button>
                                {error && <div className="error">{error}</div>}
                            </div>
                            <p className="forgot-password text-right mt-2">
                                Not yet registered? <a href="register">Register</a>
                            </p>
                            </div>
                        </form>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export { Login }