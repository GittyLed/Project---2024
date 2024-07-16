import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import '../styles/login.css';


export default function Login() {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        name: "", 
        password: ""   
    });
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSuccess = (data) => {
        setNewUser(newUser.username = data.userName, newUser.password = data.password);
        const options = {
            headers: { 'Content-Type': 'application/json' }
        };
        axios.post(`http://localhost:5217/api/Authentication/login`, JSON.stringify(newUser), options)
            .then((res) => { 
                console.log("login");
                navigate("/DisplayCourses");
             })
            .catch(
            (err) =>  {
                console.log(err) 
                if (err.response) {
                    console.log(err)
                if (err.response.status === 409) {
                    console.log("Username does not exists, pls sign up");
                    setErrorMessage('Username does not exists, pls sign up');
                }}})
    };

    const onFailed = (error) => { console.log("form failed", error) };

    const requirements = {
        userName: {
            required: "Username is required"
        },
        password: {
            required: "Password is required",
            maxLength: {
                value: 10,
                message: "Password can be up to 10 digits"
            },
            minLength: {
                value: 6,
                message: "Password should be at least 6 digits"
            }
        }
    };

    return (
        <div>
            <div className="container">
                <div className="card shadow-sm">
                    <div className="card-header">
                        <h3>Login</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSuccess, onFailed)}>
                            <div className="form-group mb-3">
                                <label htmlFor="userName" className="form-label">Username:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userName"
                                    name="userName"
                                    placeholder="Enter your username"
                                    {...register("userName", requirements.userName)}
                                />
                                {errors?.userName && <small style={{ color: "red" }}>{errors.userName.message}</small>}
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    {...register("password", requirements.password)}
                                />
                                {errors?.password && <small style={{ color: "red" }}>{errors.password.message}</small>}
                            </div>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            <center>
                                <p>don't have an account? <a href="/Registration">Sign up</a></p>
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
