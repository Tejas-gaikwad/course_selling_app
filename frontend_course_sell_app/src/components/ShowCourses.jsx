import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

function ShowCourses() {
    const [allCourses, setAllCourses] = useState([]);
    const [userCourses, setUserCourses] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        fetch("http://localhost:3000/users/purchasedCourses", {
            method:"GET",
            headers:{
                authorization:`Bearer ${token}`
            }
        }).then((resp) => {
            resp.json().then((data)=>{
                setUserCourses(data);
                console.log("user purchased courses ->   "+data);
            })
        })
    }, [])


    useEffect(()=>{
        const token = localStorage.getItem('token');
        fetch("http://localhost:3000/users/courses", {
            method:"GET",
            headers: {
                'Content-Type' : 'application/json',
                'authorization' : `Bearer ${token}`
            }
        }).then((resp) => {
            resp.json().then((data)=>{
              
                setAllCourses(data);

                console.log("allCourses ->   "+allCourses);
            })
        })
    }, [])

    return (
    <div style={({
        position:'absolute',
        top:'10%',
        left:'5%'
    })}>
       <h2> Welcome user, your courses are here.</h2>
        
       <div style={({
            display:'flex',
            flexWrap:'wrap',
            gap:'20px',
            // justifyContent: 'center',
       })}>{
            allCourses
            .map((course)=>{
                return (
                    <AllCourses allCourses={userCourses}  id={course._id} image={course.imageLink} titleOfCourse={course.title} description={course.description} price={course.price}></AllCourses>
                )
            })
        }
       </div>
    </div>)
}

function AllCourses(props) {

    const navigate  = useNavigate();
    const thisCourseIsPresent = JSON.stringify(props.allCourses).includes(props.id);

    function handleCourseClick() {
            const token = localStorage.getItem('token');
            const courseId = props.id;
            
            console.log("thisCourseIsPresent ->>>>>>>>  "+ thisCourseIsPresent);
            if(thisCourseIsPresent){
                navigate(`/courses/${props.id}`);
            }else{
                fetch(`http://localhost:3000/users/courses/${courseId}`, {
                    method:"POST",
                    headers:({
                        'Content-Type':'application/json',
                        'authorization' : `Bearer ${token}`
                    })
                    }).then((resp)=>{
                        resp.json().then((data)=>{
                    }).catch((err) => {
                        console.log("err  =>>>>  "+err);
                    })
                })
            }
    }
    return (
        <div onClick={handleCourseClick}
        style={({
            width:'300px',
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#242424',
            cursor: 'pointer',
        })}>
            <img src={props.image} alt="Description of the image" height={150} width={300} />

            <p style={({ fontSize:'20px', fontWeight:'bold'})}> 
                {props.titleOfCourse}
            </p>

            <p style={({height: '3.0em', overflow: 'hidden', whiteSpace: 'nowrap',textOverflow: 'ellipsis',fontSize:'16px',color:'grey'})}>
                {props.description}
            </p>

  
            <div style={({ display:'flex', alignItems:'center', justifyContent: 'space-between'})}>
                $ {props.price} 

                <button onClick={handleCourseClick}> {thisCourseIsPresent ? 'View' : 'Purchase'}  </button>
            </div>
        </div>
    )
}

export default ShowCourses;