import logo from './logo.svg';
import './App.css';
import Fetch from './Fetch';
import Registration from './Registration';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <Fetch></Fetch> */}
        {/* <Registration></Registration> */}
        <Login></Login>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React

        </a>

      </header>
    </div>
  );
}

export default App;
