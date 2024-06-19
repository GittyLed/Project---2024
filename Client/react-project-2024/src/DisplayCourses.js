import axios from "axios";
import { useEffect, useState } from "react";

export default function DisplayCourses() {
    const myStyle = <style>
        {`
        body {
            background-color: #fff5f7; /* Light pink background for the entire page */
        }

        .container {
            margin-top: 50px;
            max-width: 600px;
        }

        .card {
            border: none;
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .card-header {
            background: linear-gradient(90deg, #ff80ab 0%, #ffeb3b 100%);
            color: white;
            border-radius: 12px 12px 0 0;
        }

        .card-body {
            padding: 2rem;
        }

        .form-label {
            font-weight: bold;
            color: #333;
        }

        .form-control {
            border-radius: 8px;
            border: 1px solid #ced4da;
            padding: 10px;
        }

        .btn-primary {
            background-color: #ff80ab;
            border-color: #ff80ab;
            transition: background-color 0.3s, border-color 0.3s;
        }

        .btn-primary:hover {
            background-color: #ff4081;
            border-color: #ff4081;
        }

        .alert-info {
            background-color: #fffde7;
            color: #ffeb3b;
            border-color: #fff9c4;
        }

        .form-control, .form-select {
            width: 100%;
            box-sizing: border-box;
        }

        .form-select {
            padding: 10px;
            border-radius: 8px;
            border: 1px solid #ced4da;
        }
        `}
    </style>
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5217/api/courses")
            .then((res) => {
                setCourses(res.data);
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, []);

    return (
        courses.map(course => 
        <div>
            <style>{myStyle}</style>
            <div className="container">
                <div className="card shadow-sm">
                    <div className="card-header text-center">
                        <h3>{course.courseName}</h3>
                    </div>
                    <div className="card-body">
                        <div className="form-group mb-3">
                            <span>lessons: {course.numOfMeetings}</span>
                        </div>
                        <div className="form-group mb-3">
                            <span>price: {course.price}</span>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">i want to join!</button>
                    </div>
                </div>
            </div>
        </div>
        )
    );
}