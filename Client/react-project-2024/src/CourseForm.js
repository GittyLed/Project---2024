import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; // Added

const CourseForm = () => {
    const [formData, setFormData] = useState({
        courseName: '',
        numOfMeetings: '',
        price: '',
        fieldId: ''
    });

    const [message, setMessage] = useState(''); // Added

    const fields = [
        { id: 1, name: 'Computer Science' },
        { id: 2, name: 'Mathematics' },
        { id: 3, name: 'Physics' },
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

    const handleSubmit = async (e) => { // Updated to async
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5217/api/courses', formData); // Added axios.post
            setMessage('Course created successfully!'); // Added
            console.log('Form data submitted:', response.data);
        } catch (error) {
            setMessage('Failed to create course.'); // Added
            console.error('There was an error submitting the form!', error);
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white text-center">
                    <h3>Create a Course</h3>
                </div>
                <div className="card-body">
                    {message && <div className="alert alert-info">{message}</div>} {/* Added message display */}
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
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="fieldId" className="form-label">Field:</label>
                            <select
                                className="form-control"
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
    );
};

export default CourseForm;
