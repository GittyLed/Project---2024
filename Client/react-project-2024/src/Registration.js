import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'


export default function Registration() {
    // const navigate = useNavigate();
    const userName = useRef();
    const password = useRef();
    const email = useRef();
    const userExist = useRef();
    const [newUser, setNewUser] = useState({
        name: null,
        email: null,
        password: null
    });

    const { register, handleSubmit, formState: { errors } } = useForm();

    // const onSuccess = (data) => {navigate(`/HomePage/${data.userName}/${data.password}`)}
    const onSuccess = (data) => {
        setNewUser(newUser.username = data.userName, newUser.password = data.password, newUser.email = data.email);
        const options = {
            headers: { 'Content-Type': 'application/json' }
        };
        axios.post(`http://localhost:5217/api/Authentication/register`, JSON.stringify(newUser), options)
            .then((response) => {
                if (response.status === 200) {
                    console.log("User signed up");
                    console.log(response);
                    // Perform actions after successful signup, e.g., redirect to login page or log in the user
                }
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if (error.response.status === 409) {
                        console.log("Username already exists. Please log in.");
                        // Handle the case where the username already exists
                    } else if (error.response.status === 400) {
                        console.log("Bad Request: ", error.response.data);
                        // Handle validation errors or bad request
                    } else if (error.response.status === 500) {
                        console.log("Internal Server Error: ", error.response.data);
                        // Handle server error
                    } else {
                        console.log("Error: ", error.response.data);
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log("No response received: ", error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error: ", error.message);
                }
            })
            .finally(() => {
                // Actions to perform regardless of success or failure
            });
    }


    const onFailed = (error) => {
        console.log("Form submission failed:", error);
        console.log("Form errors:", errors);
    }


    const requirements = {
        userName: {
            required: true,
            pattern: {
                value: /^[a-zA-Z0-9_]{4,}$/,
                message: 'Username must be at least 4 characters long and contain only letters, numbers, or underscores.',
            },
        },
        password: {
            pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                message: 'Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.',
            },
        },
        email: {
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address.',
            },
        },
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSuccess, onFailed)}>
                <input ref={userName} name="userName" placeholder="enter your name"  {...register("userName", requirements.userName)} />
                {errors.userName && <small style={{ color: "red" }}>{errors.userName.message}</small>}
                <br />
                <input type="password" ref={password} name="password" placeholder="enter password" {...register("password", requirements.password)} />
                {errors.password && <small style={{ color: "red" }}>{errors.password.message}</small>}
                <br />
                <input ref={email} name="email" placeholder="enter your email" {...register("email", requirements.email)} />
                {errors.email && <small style={{ color: "red" }}>{errors.email.message}</small>}
                <center>
                    <button type="submit">Submit</button>
                </center>
            </form>
        </>
    )
};
