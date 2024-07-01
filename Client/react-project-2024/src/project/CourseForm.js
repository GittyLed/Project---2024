import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CourseForm = () => {
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
    const [formData, setFormData] = useState({
        courseName: '',
        numOfMeetings: '',
        price: '',
        fieldId: ''
    });

    const [message, setMessage] = useState('');

    const fields = [
        { id: 1, name: 'Computer Science' },
        { id: 2, name: 'Art' },
        { id: 3, name: 'Cooking &  Baking' },
        { id: 4, name: 'Chemistry' },
        { id: 5, name: 'Biology' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5217/api/courses', formData);
            setMessage('Course created successfully!');
            console.log('Form data submitted:', response.data);
        } catch (error) {
            setMessage('Failed to create course.');
            console.error('There was an error submitting the form!', error);
        }
    };

    return (
        <div>
            <style>{myStyle}</style>
            <div className="container">
                <div className="card shadow-sm">
                    <div className="card-header text-center">
                        <h3>Create a Course</h3>
                    </div>
                    <div className="card-body">
                        {message && <div className="alert alert-info">{message}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="courseName" className="form-label">Course Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="courseName"
                                    name="courseName"
                                    value={formData.courseName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="numOfMeetings" className="form-label">Number of Meetings:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="numOfMeetings"
                                    name="numOfMeetings"
                                    value={formData.numOfMeetings}
                                    onChange={handleChange}
                                    required
                                    min="0" // Ensures only 0 or positive values are accepted
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="price" className="form-label">Price:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    min="0" // Ensures only 0 or positive values are accepted
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="fieldId" className="form-label">Field:</label>
                                <select
                                    className="form-select"
                                    id="fieldId"
                                    name="fieldId"
                                    value={formData.fieldId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a field</option>
                                    {fields.map((field) => (
                                        <option key={field.id} value={field.id}>
                                            {field.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Create Course</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseForm;
