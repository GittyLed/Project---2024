import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios'


export default function Login(){
    const userName = useRef();
    const password = useRef();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSuccess = (data) => {
        axios.get(`http://localhost:5217/api/user/${data.userName}`)
            
            .then((response) => {
                if(data.password == response.data.password){
                    console.log("you logged in");
                }
                else{
                    console.log("password incorrect");
                }

            })
            .catch((error) => {
                console.log(error.message);
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
        }
    }

    return(
        <form onSubmit={handleSubmit(onSuccess, onFailed)}>
            <input ref={userName} name="userName" placeholder="username" {...register("userName", requirments.userName)}></input>
                <small style={{ color: "red" }}>{errors?.userName && errors.userName.message}</small>
                <br></br>
                <input type="password" ref={password} name="password" placeholder="password" {...register("password", requirments.password)}></input>
                <small style={{ color: "red" }}>{errors?.password && errors.password.message}</small>
                <center>
                    <button>Submit</button>
                </center>
        </form>
    )
}


    