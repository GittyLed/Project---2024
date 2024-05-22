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
        axios.get(`http://localhost:5217/api/user/${data.userName}`)
            .then((response) => {
                if(response.status == 200){
                    userExist.current = true;
                }
            })
            .catch((error) => {
                userExist.current = false;
            })
            .finally(function () {
                if(!userExist.current){
                    AddUser(data);
                }
                else{
                    console.log("pls login");
                }
                
            });
        
        
    }
    function AddUser(data){
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

    const onFailed = (error) => { console.log("Form submission failed:", error);
    console.log("Form errors:", errors); // Log errors object

    // Additional console logs to debug errors object
    console.log("Username error:", errors.userName);
    console.log("Password error:", errors.password);
    console.log("Email error:", errors.email); }


    // const requirments = {
    //     userName: {
    //         // required: "name is required",
    //         // required_pattern : "/^[a-zA-Z0-9]{6,}$/",
    //         pattern:{
    //             value : "/^[a-zA-Z0-9]{6,}$/",
    //             message: "username pls"
    //         }
            
    //     },
    //     password: {
    //         required: "password is required",
    //         maxLength: {
    //             value: 10,
    //             message: "password can be up to 10 digits"
    //         },
    //         minLength: {
    //             value: 6,
    //             message: "password should be at least 6 digits"
    //         }
    //     },
    //     email: {
    //         required: "email is required."
    //     }
    // }

    // const requirements = {
    //     userName: {
    //         required: true,
    //         pattern: /^[a-zA-Z0-9_]{4,}$/,
    //         message: 'Username must be at least 4 characters long and contain only letters, numbers, or underscores.',
    //       },
    //       password: {
    //         pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
    //         message: 'Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.',
    //       },
    //       email: {
    //         pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    //         message: 'Please enter a valid email address.',
    //       },
    // }
    

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
    // return (
    //     <>
    //         <form onSubmit={handleSubmit(onSuccess, onFailed)}>
    //             <input ref={userName} name="userName" placeholder="enter your name"  {...register("userName", requirements.userName)}></input>
    //             {errors.userName && <small style={{ color: "red" }}>{errors.userName.message}</small>}
                
    //             {/* <small style={{ color: "red" }}>{errors.userName && errors.userName.message}</small> */}
    //             <br></br>
    //             <input type="password" ref={password} name="password" placeholder="enter password" {...register("password", requirements.password)}></input>
    //             <small style={{ color: "red" }}>{errors.password && errors.password.message}</small>
    //             <br></br>
    //             <input ref={email} name="email" placeholder="enter your email" {...register("email", requirements.email)} ></input>
    //             <small>{errors.email && errors.email.message}</small>
    //             <center>
    //                 <button type="submit">Submit</button>
    //             </center>
    //         </form>
    //     </>
    // )

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
