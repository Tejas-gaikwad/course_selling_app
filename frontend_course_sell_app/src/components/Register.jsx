import { useState } from "react";
import './register.css';


function Register() {
    
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

function handleUsername(event) {
    setUsername(event.target.value);
}

function handlePassword(event) {
    setPassword(event.target.value)
}

    return (
        <div style={({ position:"absolute", top:'20%', left:'20%' })}>
            <h1>Register</h1>
            <TextFieldComponent username={username} password={password} handleUserName={handleUsername} handlePassword={handlePassword}></TextFieldComponent>
        </div>
    )
}

function TextFieldComponent(props) {

    function doSignUp()  {
        console.log("username  =>>>>  "+props.username);
        console.log("password  =>>>>  "+props.password);
        
            fetch("http://localhost:3000/users/signup", {
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    username : props.username,
                    password : props.password
                })
            }).then((resp) => {
               
                console.log("RESPONSE ->.>> "+ resp);
            }) 
        
    }

    return (
    <div className="text-field-container">
        <input type="text" value={props.username} onChange={props.handleUserName} placeholder="Enter Username" className="text-field"/>
        <br/>    <br/>
        <input type="text" value={props.password} onChange={props.handlePassword} placeholder="Enter Password" className="text-field"/>
        <br/>    <br/>
        <button onClick={doSignUp} >SignUp</button>
    </div> 
    )
}

export default Register;