import React from 'react';

const Header = () => {

    const isUserLogin = localStorage.getItem('isUserLogin');

    console.log("isUserLogin  =>>>>   "+isUserLogin);

    return (
        <div style={styles.header}>
     
          <div style={styles.leftSide}>
            <h3 style={({ fontSize:'20px'})}>Coursera</h3>
          </div>
          <div style={styles.rightSide}>
            <h4 style={({marginRight: '20px'})}>Home</h4>
            <h4 style={({marginRight: '20px'})}>About</h4>
          {isUserLogin === 'true' ? <div></div> : <button onClick={  ()=>{
                window.location.href='/login'
            } } style={({marginRight: '50px'})}>Login</button>}
          </div>
        </div>
      );
};

const styles = {
    header: {
        paddingLeft: '20px',
        justifyContent : 'space-between',
        display:'flex',
        background: '#333',
        color: '#fff',
        padding: '2px',
        position: 'fixed', // Stick to the top of the viewport
        width: '100%', // Full width
        top: 0, // Position at the top of the viewport
        left: 0, // Align to the left edge
      },
    leftSide: {
      flex: 1,
    },
    rightSide: {
      display: 'flex',
      alignItems: 'center',
    },
    h4: {
      marginRight: '0 10px',
    },
    button: {
      padding: '10px 10px',
      backgroundColor: 'blue',
      color: '#fff',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

export default Header;
