import { useEffect, useState } from "react";

import { useNavigate  } from 'react-router-dom';

function AdminDashboard() {

    const [courses, setCourses] = useState([]);
    const [ isLoading , setLoading ] = useState(true);

    const adminToken = localStorage.getItem('adminToken');

    useEffect(()=>{
        fetch("http://localhost:3000/admin/courses", {method:"GET", headers:{
            'Content-Type':'application/json',
            'authorization' : `Bearer ${adminToken}`
        }}).then((resp)=>{
            resp.json().then((data) => {
                setCourses(data);
                setLoading(false);
            })
        })
    },)

    function handleEditOfCourse() {
        console.log("EDIT COURSE =>>>>>>>>  " );
    }

    return (

        <div style={({
            position:'absolute',
            top:'10%',
            left:'5%'
        })}>
           <h2> Welcome Admin, your courses are here.</h2>
        <div style={({
            display:'flex',
            flexWrap:'wrap',
            gap:'20px',
            // justifyContent: 'center',
       })}>
           {/* { courses } */}
            
            {isLoading ? 'Loading' : 
                courses.map((course) => {
                  return  (

                    <AllCourses handleEditOfCourse={handleEditOfCourse} allCourses={courses} image={course.imageLink} id={course.id} price={course.price} titleOfCourse={course.title} description={course.description}></AllCourses>
                    // <div>
                    // {course.title}
                    // {/* // {course.price}
                    // // {course.description} */}
                    //     </div>
                  )
                })
            }
            </div>
        </div>
    )
}

function AllCourses(props) {

    const navigate  = useNavigate();
    const thisCourseIsPresent = JSON.stringify(props.allCourses).includes(props.id);

    function handleCourseClick() {
            const token = localStorage.getItem('token');
            const courseId = props.id;
            
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
        <div 
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

                <button onClick={props.handleEditOfCourse}> Edit  </button>
            </div>
        </div>
    )
}

export default AdminDashboard;