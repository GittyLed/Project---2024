import logo from './logo.svg';
import './App.css';
import Fetch from './Fetch';
import Registration from './Registration';
import Login from './Login';
import CourseForm from './CourseForm';
import DisplayCourses from './DisplayCourses';

function App() {
  return (
    <div className="App">
      {/* <Fetch></Fetch> */}
      {/* <Registration></Registration> */}
      {/* <Login></Login> */}
      <DisplayCourses></DisplayCourses>
      <CourseForm></CourseForm>
    </div>
  );
}

export default App;
