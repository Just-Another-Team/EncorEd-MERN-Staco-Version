import '../App.css';
import logo from '../assets/logo.svg';

import { Container, Row, Col } from "react-bootstrap"
import { TopNav, SideNav } from '../components/NavBar';

const Login = () => {
    return(
        <>
            <Container fluid className='mx-0 px-0' style={{overflow: "hidden"}}>
                <TopNav />
                <Row style = {{ backgroundColor:'#45A1FD'}}>
                    <div className="Auth-form-container">
                        <form className="Auth-form">
                            <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Sign In</h3>
                            <div className="form-group mt-3">
                                <label>Email address</label>
                                <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="btn btn-primary">
                                Submit
                                </button>
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