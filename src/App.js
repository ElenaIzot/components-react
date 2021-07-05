import './styles/main.scss';
import Stepper  from './Components/Stepper'
import Dropdown from "./Components/Dropdown";
import Datepicker from "./Components/Calendar/Datepicker";

const names = ['Figma', 'Photoshop', 'Sketch', 'Framer', 'InVision Studio','Figma', 'Photoshop', 'Sketch', 'Framer', 'InVision Studio'];
const cities = ['Tomsk', 'Kemerovo', 'Moscow', 'Vladivostok', 'Omsk','Krasnoyarsk', 'Chita', 'Irketsk'];

function App() {
  return (
    <>
    <div className="section">
      <Stepper />т
    </div>

    <div className="section">
      <Dropdown name={cities}/>
      <Datepicker />
    </div>

    <div className="section">
     
    </div>
    </>
  );
}

export default App;
