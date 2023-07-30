import { useState } from "react";

function EditCourse() {

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

    const course = {
        title : 'title',
        description : 'description'
    }

    const [isEditDialogOpen, setIsEditingDialog] = useState(false);

    function handleEditClick()  {
        setIsEditingDialog(true);
    }

    function closeEditDialog()  {
        setIsEditingDialog(false);
    }

    return (
        <div>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <button onClick={handleEditClick}>Edit</button>
            {isEditDialogOpen && <EditDialog course={course} onClose={closeEditDialog} />}
        </div>
    )
}

function EditDialog(props) {

    const [editedCourse, setEditedCourse] = useState({
        title: props.course.title,
        description: props.course.description,
        // Add more fields here if needed
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedCourse((prevCourse) => ({
          ...prevCourse,
          [name]: value,
        }));
      };
    
      const handleSave = () => {
        // Implement save functionality here. You can call an API or update the state in the parent component.
        // For this example, let's just log the edited course object.
        console.log('Edited Course:', editedCourse);
        props.onClose();
      };
    
      const handleCancel = () => {
        props.onClose();
      };

      
    return (
        <div className="edit-dialog">
            <h2>Edit Course</h2>
            <label>Title:</label>
            <input type="text" name="title" value={editedCourse.title} onChange={handleInputChange} />
            <label>Description:</label>
            <textarea
                name="description"
                value={editedCourse.description}
                onChange={handleInputChange}
            />
            {/* Add more fields for other course details if needed */}
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}

export default EditCourse;