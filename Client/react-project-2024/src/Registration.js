import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios'


export default function Registration() {
    // const navigate = useNavigate();
    const userName = useRef();
    const password = useRef();
    const email = useRef();
    const [newUser, setNewUser] = useState({
        name: null,
        email: null,
        password: null
    });

    const { register, handleSubmit, formState: { errors } } = useForm();


    // const onSuccess = (data) => {navigate(`/HomePage/${data.userName}/${data.password}`)}
    const onSuccess = (data) => {
        setNewUser(newUser.name = data.userName, newUser.password = data.password, newUser.email = data.email);
        console.log(newUser);
        console.log(JSON.stringify(newUser));
        const options = {
            headers: { 'Content-Type': 'application/json' }
        };

        axios.post('http://localhost:5217/api/user', JSON.stringify(newUser), options)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    const onFailed = (error) => { console.log("form failed", error) }

    const requirments = {
        userName: {
            required: "name is required"
        },
        password: {
            required: "password is required",
            maxLength: {
                value: 10,
                message: "password can be up to 10 digits"
            },
            minLength: {
                value: 6,
                message: "password should be at least 6 digits"
            }
        },
        email: {
            required: "email is required."
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSuccess, onFailed)}>
                <input ref={userName} name="userName" placeholder="enter your name" {...register("userName", requirments.userName)}></input>
                <small style={{ color: "red" }}>{errors?.userName && errors.userName.message}</small>
                <br></br>
                <input type="password" ref={password} name="password" placeholder="enter password" {...register("password", requirments.password)}></input>
                <small style={{ color: "red" }}>{errors?.password && errors.password.message}</small>
                <br></br>
                <input ref={email} name="email" placeholder="enter your email" {...register("email", requirments.email)} ></input>
                <center>
                    <button>Submit</button>
                </center>
            </form>
        </>
    )
};
