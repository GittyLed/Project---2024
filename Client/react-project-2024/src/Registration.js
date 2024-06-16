import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Registration() {
    const [newUser, setNewUser] = useState({
        name: "",  // Updated property name
        email: "",     // Updated property name
        password: ""   // Updated property name
    });

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSuccess = (data) => {
        setNewUser(newUser.username =  data.userName, newUser.email =  data.email, newUser.password = data.password );
        const options = {
            headers: { 'Content-Type': 'application/json' }
        };
        axios.post(`http://localhost:5217/api/Authentication/register`, JSON.stringify(newUser), options)
            .then((response) => {
                if (response.status === 200) {
                    console.log("User signed up");
                    console.log(response);
                }
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 409) {
                        console.log("Username already exists. Please log in.");
                    } else if (error.response.status === 400) {
                        console.log("Bad Request: ", error.response.data);
                    } else if (error.response.status === 500) {
                        console.log("Internal Server Error: ", error.response.data);
                    } else {
                        console.log("Error: ", error.response.data);
                    }
                } else if (error.request) {
                    console.log("No response received: ", error.request);
                } else {
                    console.log("Error: ", error.message);
                }
            });
    };

    const onFailed = (error) => {
        console.log("Form submission failed:", error);
        console.log("Form errors:", errors);
    };

    const requirements = {
        userName: {
            required: "Username is required",
            pattern: {
                value: /^[a-zA-Z0-9_]{4,}$/,
                message: 'Username must be at least 4 characters long and contain only letters, numbers, or underscores.'
            }
        },
        password: {
            required: "Password is required",
            pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                message: 'Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.'
            }
        },
        email: {
            required: "Email is required",
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address.'
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
                        <h3>Register</h3>
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
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    {...register("email", requirements.email)}
                                />
                                {errors?.email && <small style={{ color: "red" }}>{errors.email.message}</small>}
                            </div>
                            <center>
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
