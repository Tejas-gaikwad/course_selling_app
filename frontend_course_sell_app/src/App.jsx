import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CreateCourse from './components/CreateCourse';
import Landing from './components/landing';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import SingleCoursePage from './components/SingleCoursePage';
import AdminSignUp from './components/admin/admin_signup';
import AdminDashboard from './components/admin/admin_dashboard';
import AdminLogin from './components/admin/admin_login';


// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
        <Router >
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/createCourse" element={<CreateCourse />} />
                <Route path="/courses" element={<ShowCourses />} /> 
                <Route path="/courses/:courseId"  element={<SingleCoursePage />} />
            </Routes>
            <Routes>
                <Route path='/admin/signup' element={<AdminSignUp />}/>
                <Route path='/admin/login' element={<AdminLogin />}/>
      
                <Route path='/admin/courses' element={<AdminDashboard />}/>
            </Routes>
        </Router>
        
    );
}

export default App;