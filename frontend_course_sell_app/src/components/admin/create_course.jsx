import { useState } from "react";

function CreateCourse(){

    const [imageUrl, setImageUrl] = useState(null);

    function pickImage(e) {

        console.log("Pick image 1");
     
        const file = e.target.files[0];

        console.log("file  =>>>>  "+ file);

        const reader = new FileReader();

        console.log("Pick image 2");
        
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        
        console.log("Pick image 3");

        if (file) {
            reader.readAsDataURL(file);
        }

        console.log("imageUrl  ->>>>>>>>   "+imageUrl);

    }

    return (
        <div style={({ position:'absolute', top:100, left:80})}>
            <AddCourseComponent type="file" onChange={pickImage} imageUrl={imageUrl} onImagePickerClick={pickImage} ></AddCourseComponent>
        </div>
    )
}

function AddCourseComponent(props) {
    return (
        <div>
            <label style={({ padding:'10px' })}>Course Name</label>
            <br/>
            <input placeholder="Course Name" className="text-field"/>
            <br/><br/>
            <label style={({ padding:'10px' })}>Course Description</label>
            <br/>
            <input placeholder="Course Description" className="text-field"/>
            <br/><br/>
            <label style={({ padding:'10px' })}>Course Price</label>
            <br/>
            <input placeholder="Course Name" className="text-field"/>
            <br/><br/>
            <label style={({ padding:'10px' })}>Course Banner</label>
            <br/>
            <div onClick={props.onImagePickerClick}>

                <div style={({paddingLeft: '15px', paddingTop:'10px', })}><input type={props.type}  onChange={props.onChange}></input></div>

            {props.imageUrl == null 
                ? <img src="/src/assets/image_icon.jpg" alt="img" style={({ paddingLeft: '15px', paddingTop:'10px', height:'150px', width:'250px'})}/> 
                : <img src={props.imageUrl} alt="img" style={{ paddingLeft: '15px', paddingTop:'10px', maxWidth: '250px', height:'150px', }} />}
    
                
            </div>
            <br/><br/>
        </div>
    )
}

export default CreateCourse;