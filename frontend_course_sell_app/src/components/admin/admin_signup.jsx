import { useState } from "react";

function AdminSignUp() {

    const [adminName, setAdminName] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    function handleAdminName(event) {
            setAdminName(event.target.value);
    }

    function handleAdminPassword(event) {
            setAdminPassword(event.target.value);
    }

    return (
        <div>
            <TextFieldComponent handleAdminName={handleAdminName} handleAdminPassword={handleAdminPassword} adminName={adminName} adminPassword={adminPassword}/>
        </div>
    )
}

function TextFieldComponent(props) {
    function adminSignUpButton(){
        fetch("http://localhost:3000/admin/signup", {
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'username': props.adminName,
                'password': props.adminPassword
            }),

        }).then((resp)=>{
            
            if(resp.status === 200){
                window.location.href='/admin/dashboard';
            }else{
            }
        })
    }
    return (
        <div style={({ position:'absolute', top:"20%", left:"20%"})}>
            <h3>Admin SignUp</h3>
            <input type="text" value={props.adminName} placeholder="Admin username" onChange={props.handleAdminName}  className="text-field"/>
            <br/> <br/>
            <input type="text" value={props.adminPassword} placeholder="Admin password" onChange={props.handleAdminPassword}  className="text-field"/>
            <br/> <br/>
            <button onClick={adminSignUpButton} >SignUp</button>
        </div>
    )
}

export default AdminSignUp;