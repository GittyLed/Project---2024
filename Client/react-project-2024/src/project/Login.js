import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        name: "",  // Updated property name
        password: ""   // Updated property name
    });

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
                //return <Navigate to="/DisplayCourses"/>;
             })
            .catch((err) => { console.log(err) });
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
            <style>
                {`
                body {
                    background-color: #f3f4f6; /* Light background color */
                }
                .container {
                    margin-top: 50px;
                    max-width: 400px;
                }
                .card {
                    border: none;
                    border-radius: 12px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .card-header {
                    background: linear-gradient(90deg, #ff80ab 0%, #ffeb3b 100%);
                    color: white;
                    border-radius: 12px 12px 0 0;
                    text-align: center;
                }
                .card-body {
                    padding: 2rem;
                }
                .form-label {
                    font-weight: bold;
                    color: #333;
                }
                .form-control {
                    border-radius: 8px;
                    border: 1px solid #ced4da;
                    padding: 10px;
                }
                .btn-primary {
                    background-color: #ff80ab;
                    border-color: #ff80ab;
                    transition: background-color 0.3s, border-color 0.3s;
                }
                .btn-primary:hover {
                    background-color: #ff4081;
                    border-color: #ff4081;
                }
                .alert-info {
                    background-color: #fffde7;
                    color: #ffeb3b;
                    border-color: #fff9c4;
                }
                `}
            </style>
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
                            <center>
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                <button type="button" className="btn btn-primary btn-block" onClick={() => navigate('/Registration')}>Go to registration</button>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
