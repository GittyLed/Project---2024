import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaUserPlus, FaTrash, FaPlus } from "react-icons/fa"; // Import icons from react-icons library
import { useNavigate } from 'react-router-dom';

import '../styles/courses.css';

export default function DisplayCourses() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        axios.get("http://localhost:5217/api/courses")
            .then((res) => {
                setCourses(res.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const deleteCourse = (courseId) => {
        axios.delete(`http://localhost:5217/api/courses/${courseId}`)
            .then(() => {
                fetchCourses();
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const updateCourse = (courseId) => {
        navigate(`/CourseForm/${courseId}`);
    };

    const signUpCourse = (courseId) => {
        // Implement sign up logic here
        //maybe send email...
        console.log(`Sign up for course with ID: ${courseId}`);
    };

    const addCourse = () => {
        navigate("/CourseForm");
    };

    // const myStyle = m;
    return (
        <>
            <div className="container">
                {courses.map(course => (
                    <div className="card shadow-sm" key={course.courseId}>
                        <div className="card-header">
                            <h3>{course.courseName}</h3>
                        </div>
                        <div className="card-body">
                            <div className="form-group mb-3">
                                <span>Lessons: {course.numOfMeetings}</span>
                            </div>
                            <div className="form-group mb-3">
                                <span>Price: {course.price}</span>
                            </div>
                            <div className="btn-group">
                                <button className="btn" onClick={() => updateCourse(course.courseId)}><FaEdit /></button>
                                <button className="btn" onClick={() => deleteCourse(course.courseId)}><FaTrash /></button>
                            </div>
                            <button className="btn btn-action" onClick={() => signUpCourse(course.courseId)}><FaUserPlus /> Sign Up</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn-add-course" onClick={addCourse}>
                <FaPlus />
            </button>
        </>
    );
}
