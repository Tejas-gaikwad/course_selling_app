import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function SingleCoursePage(props) {
    
    const { courseId } = useParams();
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);

    const [courseDetails, setCourseDetails] = useState({});

    useEffect(()=>{
        fetch(`http://localhost:3000/users/courses/${courseId}`, {
            method:"GET",
            headers : {
                authorization : `Bearer ${token}`,
                'Content-Type' : 'application/json'
            }
        }).then((resp) => { 
            if(resp.status === 200) {
                resp.json().then((data) => { 
                    const courseDetail = data.course;
                   
                    setCourseDetails(courseDetail);
                    
                })
                setLoading(false); 
            }else{
                setLoading(false); 
                alert("There is no course Details available");
            }
            setLoading(false); 
        })
    }, [])
    return <div>
        
       { loading ? <div style={({
            
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', 
            width:'100vw'
        })}><p >Loading...</p> </div>: <ShowSingleCourseDetails  title={courseDetails.title} courseData={courseDetails} ></ShowSingleCourseDetails>}
        
    </div>
}


function ShowSingleCourseDetails(props) {

    // const thisCourseIsPresent = JSON.stringify(props.allCourses).includes(props.id);

    const thisCourseIsPresent = true;


    return (
        <div style={({ position:'absolute', top:80, left:50})}>
           
            <h2> {props.title}</h2>
        
            <img src={props.courseData.imageLink} alt='course_image' style={({ width:'30vw'})}/>
            <h4> {props.courseData.description}</h4>
            <h4>$ {props.courseData.price}</h4>
            
            <div style={({ display:'flex', alignItems:'center', justifyContent: 'space-between'})}>
       

               { thisCourseIsPresent === false ? <div></div> : <button onClick={                   
                    ()=>{
                        const token = localStorage.getItem('token');
                        const courseId = props.id;

                        if(thisCourseIsPresent){
                             handleCourseClick(props.id);
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
        }
        > Purchase </button>}
            </div>
        </div>
    )
}

export default SingleCoursePage;