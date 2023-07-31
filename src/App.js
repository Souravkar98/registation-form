import logo from './logo.svg';
import './App.css';
import RegistrationForm from './Component/Form';
import FormDetails from './Component/Details';

function App() {
  return (
    <div className="App">
        <RegistrationForm/>
        <hr/>
        <FormDetails/>
    </div>
  );
}

export default App;
