import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import '../styles/form.css';

const CourseForm = () => {
    const { courseId } = useParams(); 
    const navigate = useNavigate();


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
        { id: 3, name: 'Cooking & Baking' },
        { id: 4, name: 'Chemistry' },
        { id: 5, name: 'English' }
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
            const response = courseId
                ? await axios.put(`http://localhost:5217/api/courses/${courseId}`, formData)
                : await axios.post('http://localhost:5217/api/courses', formData);
            setMessage(courseId ? 'Course updated successfully!' : 'Course created successfully!');
            console.log('Form data submitted:', response.data);
            navigate('/DisplayCourses'); 
        } catch (error) {
            setMessage(courseId ? 'Failed to update course.' : 'Failed to create course.');
            console.error('There was an error submitting the form!', error);
        }
    };

    return (
        <div>
            <div className="container">
                <div className="card shadow-sm">
                    <div className="card-header text-center">
                        <h3>{courseId ? 'Update Course' : 'Create a Course'}</h3>
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
                                    min="0"
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
                                    min="0"
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
                            <button type="submit" className="btn btn-primary btn-block">
                                {courseId ? 'Update Course' : 'Create Course'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseForm;
