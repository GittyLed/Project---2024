import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaUserPlus, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// import '../styles/courses.css';

export default function DisplayCourses() {
  const myStyle = `
body {
    background-color: #dbc6ca; 
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    justify-content: center;
}
.card {
    width: 300px;
    background-color: #ffffff; /* White background */
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    margin: 10px;
    position: relative;
}
.card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.card:before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    background-size: cover;
    background-repeat: no-repeat;
    filter: blur(10px);
    z-index: -1;
}
.card-header {
    background: linear-gradient(90deg, #ff80ab 0%, #ffeb3b 100%);
    color: white;
    padding: 10px;
    text-align: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}
.card-body {
    padding: 15px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}
.form-group span {
    color: #4b6584; /* Dark grey for contrast */
    font-size: 0.9rem;
    margin-bottom: 10px;
}
.btn-group {
    display: flex;
    justify-content: center;
}
.btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    color: #4b6584;
    font-size: 1.2rem;
    transition: transform 0.2s;
    margin: 5px;
}
.btn:hover {
    transform: scale(1.2);
}
.btn-action {
    background-color: #f7b731; /* Yellow color */
    border-color: #f7b731;
    width: 100%;
    color: white;
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
}
.btn-action:hover {
    background-color: #f5a623; /* Darker yellow for hover effect */
    border-color: #f5a623;
}
.btn-action:focus, .btn-action:active {
    background-color: #f7b731; /* Keep the same yellow color */
    border-color: #f7b731;
    color: white;
    box-shadow: none; /* Remove default blue shadow */
}
.btn-add-course {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #ff6b81; /* Pink color */
    border-color: #ff6b81;
    color: white;
    padding: 10px 15px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}
.btn-add-course:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
`;

  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = () => {
    axios
      .get("http://localhost:5217/api/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteCourse = (courseId) => {
    axios
      .delete(`http://localhost:5217/api/courses/${courseId}`)
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

  return (
    <>
      <style>{myStyle}</style>
      <div className="container">
        {courses.map((course) => (
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
                <button
                  className="btn"
                  onClick={() => updateCourse(course.courseId)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn"
                  onClick={() => deleteCourse(course.courseId)}
                >
                  <FaTrash />
                </button>
              </div>
              <button
                className="btn btn-action"
                onClick={() => signUpCourse(course.courseId)}
              >
                <FaUserPlus /> Sign Up
              </button>
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
