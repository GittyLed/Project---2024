import { useRef } from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";


export default function Registration(){
    // const navigate = useNavigate();
    const userName = useRef();
    const password = useRef();
    const phone = useRef();
    const changeColor = () => {
        phone.current.style.backgroundColor = "red"
        if(phone.current.value.length == 10){
            phone.current.style.backgroundColor = "green";
        }
        else{
            phone.current.style.backgroundColor = "red"
        }
    }
    const { register, handleSubmit, formState: { errors } } = useForm()
    // const onSuccess = (data) => {navigate(`/HomePage/${data.userName}/${data.password}`)}
    const onSuccess = (data) => {console.log("form succeed")}

    const onFailed = (error) => { console.log("form failed", error) }

    const requirments = {
        userName: {
            required: "name is required"
        },
        password: {
                required: "password is required",
                maxLength:{
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
        <>
            <form onSubmit={handleSubmit(onSuccess, onFailed)}>
                <input ref={userName} name="userName" placeholder="enter your name" {...register("userName", requirments.userName)}></input>
                <small style={{color:"red"}}>{errors?.userName && errors.userName.message}</small>
                <br></br>
                <input type="password" ref={password} name="password" placeholder="enter password" {...register("password", requirments.password)}></input>
                <small style={{color:"red"}}>{errors?.password && errors.password.message}</small>
                <br></br>
                <input ref={phone} name="phone" placeholder="enter phone number" onChange={(e)=> changeColor()}></input>
                <center>
                    <button>Submit</button>
                </center>
            </form>
        </>
        )
}