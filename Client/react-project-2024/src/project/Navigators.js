import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import DisplayCourses from './DisplayCourses';
import CourseForm from './CourseForm';


export default function Navigator() {
    return(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/Registration" element={<Registration/>} />
            <Route exact path="/DisplayCourses" element={<DisplayCourses/>}/>
            <Route exact path="/CourseForm" element={<CourseForm/>}/>
            <Route exact path="/CourseForm/:courseId" element={<CourseForm/>}/>
        </Routes>
    </BrowserRouter>)
}






