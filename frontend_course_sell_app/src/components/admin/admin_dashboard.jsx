import { useEffect, useState } from "react";
import { useNavigate  } from 'react-router-dom';
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

function AdminDashboard() {

    const [courses, setCourses] = useState([]);
    const [ isLoading , setLoading ] = useState(true);
    const [ isDialogOpen, setOpenDialog ] = useState(false);
    const adminToken = localStorage.getItem('adminToken');

    useEffect(()=>{
        fetch("http://localhost:3000/admin/courses", {method:"GET", headers:{
            'Content-Type':'application/json',
            'authorization' : `Bearer ${adminToken}`
        }}).then((resp)=>{
            if(resp.status === 200) {
                resp.json().then((data) => {
                    setCourses(data);
                    setLoading(false);
                })
            }else if (resp.status === 403){
                navigate("/error")
            }else{
                alert("There is Some error, Please try again.")
            }
            
        })
    },)

    function handleEditOfCourse() {
        console.log("EDIT COURSE =>>>>>>>>  " );
        openDialog(true);
    }

    function addCourse() {
        console.log("add new course");
        window.location.href='/admin/course/create_course'
    }

    function openDialog() {
        setOpenDialog(true);
    }
    function handleClose() {
        setOpenDialog(false);
    }

    const [courseNameChange, setCourseNameChange] = useState('');
    function handleCourseNameChange(event) {
        setCourseNameChange(event.target.value);
    }

    return (
        <div style={({
            position:'absolute',
            top:'10%',
            left:'5%'
        })}>
            <h2> Welcome Admin, your courses are here.</h2>
            <button onClick={addCourse}>Add Course</button>  
            {isDialogOpen && 
            <Dialog PaperProps={{
                style: {
                    color:' #ffffff',
                    backgroundColor: '#1a1a1a',
                    boxShadow: 'none',
                },
              }} onClose = {handleClose} open = {openDialog}>
                <DialogTitle> Edit Course </DialogTitle>
                <input style={({ marginLeft: '50px', marginRight:'50px'})} placeholder="Enter course Name" value={courseNameChange} onChange={(event)=>{
                    setCourseNameChange(event.target.value);
                }}  className="text-field"/>
                <input style={({ marginLeft: '50px', marginRight:'50px'})} placeholder="Enter course Name" value={courseNameChange} onChange={handleCourseNameChange} className="text-field"/>
                <input style={({ marginLeft: '50px', marginRight:'50px'})} placeholder="Enter course Name" value={courseNameChange} onChange={handleCourseNameChange} className="text-field"/>
                
            </Dialog>
            }
           <br></br><br></br>
        <div style={({
            display:'flex',
            flexWrap:'wrap',
            gap:'20px',
            // justifyContent: 'center',
       })}>
        
            
            {isLoading ? 'Loading' : 
                courses.map((course) => {
                  return  (

                    <div>
                        <AllCourses handleEditOfCourse={handleEditOfCourse} allCourses={courses} image={course.imageLink} id={course.id} price={course.price} titleOfCourse={course.title} description={course.description}></AllCourses>
                    </div>
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