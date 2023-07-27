import { useState } from "react";

function AdminLogin() {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleUsername(event) {
        setUsername(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }
    return (
        <div>
            <AdminLoginTextfield handleUsername={handleUsername} handlePassword={handlePassword} username={username} password={password}></AdminLoginTextfield>
        </div>
    )
}

function AdminLoginTextfield(props) {

    function doLogin() {
        fetch("http://localhost:3000/admin/login", {
            method:"POST",
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                "username" : props.username,
                "password" : props.password
            }),
        }).then((resp) => {
            
            if(resp.status === 200){
                resp.json().then((data) => {
                    const token = data.token;
                    localStorage.setItem('adminToken', token);
                    window.location.href='/admin/courses'
                })
            }else{
                alert("Login Failed");
            }
            
        })
    }


    return (
        <div>
            <input type="text" placeholder="Admin username" onChange={props.handleUsername} value={props.username} className="text-field"/>
            <br/> <br/>
            <input type="text" placeholder="Admin password" onChange={props.handlePassword} value={props.password} className="text-field"/>
            <br/> <br/>
            <button onClick={doLogin}>Login</button>
        </div>
    )
}

export default AdminLogin;