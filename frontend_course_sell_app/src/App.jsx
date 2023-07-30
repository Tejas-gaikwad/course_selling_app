import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Login from './components/Login';
import Landing from './components/landing';
import Register from './components/Register';
import ShowCourses from './components/ShowCourses';
import SingleCoursePage from './components/SingleCoursePage';
import AdminSignUp from './components/admin/admin_signup';
import AdminDashboard from './components/admin/admin_dashboard';
import AdminLogin from './components/admin/admin_login';
import EditCourse from './components/admin/edit_course';
import CreateCourse from './components/admin/create_course';
import Header from './components/header';
import NotFound403 from './components/NotFound403';
import AuthService from './components/Authservice';


// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {

    // AuthService.isAuthenticated() ? (
    //     <Component {...props} />
    //   ) : (
    //     <Redirect to="/login" />
    //   )

      const isUserLogin = localStorage.getItem('isUserLogin');

    return (
        <Router >
            <Header />

            
                
                    <Routes>
                        
                        <Route path='/error' element={<NotFound403 />}/>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/courses" element={<ShowCourses />} /> 
                        <Route path="/courses/:courseId"  element={<SingleCoursePage />} />
                    </Routes>
                    <Routes>
                        <Route path='/admin/signup' element={<AdminSignUp />}/>
                        <Route path='/admin/login' element={<AdminLogin />}/>
                        <Route path='/admin/courses' element={<AdminDashboard />}/>
                        <Route path='/admin/courses/:courseId' element={<EditCourse />}/>
                        <Route path='/admin/course/create_course'element={<CreateCourse/>} />
                    </Routes> 
                
        
        </Router>
        
    );
}

export default App;