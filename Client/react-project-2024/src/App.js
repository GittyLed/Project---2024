import logo from './logo.svg';
import './App.css';
import Fetch from './Fetch';
import Registration from './project/Registration';
import Login from './project/Login';
import CourseForm from './project/CourseForm';
import DisplayCourses from './project/DisplayCourses';
import { Provider } from 'react-redux';
import './App.css';
import Navigator from "./project/Navigators.js"; 

// function App() {
//   return (
//     <div className="App">
//       {/* <Fetch></Fetch> */}
//       {/* <Registration></Registration> */}
//       {/* <Login></Login> */}
//       <DisplayCourses></DisplayCourses>
//       {/* <CourseForm></CourseForm> */}
//     </div>
//   );
// }


function App() {
  return (
    <>
      <Navigator></Navigator>
    </>
  );
}

export default App;
