import Header from './header'

function Landing() {
    return  (
    
        <div style={ ({padding:"10px", paddingLeft:"30px",  position: 'absolute',
        top: 80,
        left: 0,})}>

        <h1>Welcome to course selling website!</h1>
        <br/>
        {/* <a href="/register">Register</a> */}
        <button className="button" onClick={event =>  window.location.href='/register'} >
        SignUp
        </button>
        <br/><br/>
        <button className="button" onClick={event =>  window.location.href='/login'} >
        Login
        </button>
    </div>
   
)
    
}

export default Landing;