import { useState } from "react";

function Login() {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    function handleUsername(event) {
        setUserName(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    return (
        <div style={({ position:"absolute", top:"20%", left:"20%"})}>
            <h1>Login</h1>
            <TextFieldComponent username={username} password={password} handlePassword={handlePassword} handleUsername={handleUsername}></TextFieldComponent>
        </div>
    )
}

function TextFieldComponent(props) {
    async function doLogin(){
        fetch("http://localhost:3000/users/login", {
            method:"POST",
            headers:{ 'Content-Type' : "application/json"},
            body:JSON.stringify({
                username : props.username,
                password : props.password,
            })
        }).then((resp)=>{
            if(resp.status === 200){
                resp.json().then(
                    (data) => {
                        console.log(data);
                    const token = data.token;
                    localStorage.setItem('token', token);
                    localStorage.setItem('isUserLogin', 'true');
                    window.location.href='/courses'
                })
            }else{
                alert("Login failed, Try again!");
            }
          
           
        })
    }
    return (
        <div>
            <input type="text" placeholder="Enter username" onChange={props.handleUsername} value={props.username} className="text-field"/>
            <br/> <br/>
            <input type="text" placeholder="Enter password" onChange={props.handlePassword} value={props.password} className="text-field"/>
            <br/> <br/>
            <button onClick={doLogin}>Login</button>
        </div>
    )
}

export default Login;