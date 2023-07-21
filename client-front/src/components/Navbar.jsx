import { NavLink } from "react-router-dom";
// import {GiSun,GiEvilMoon} from 'react-icons/gi';
const Navbar = () => {
  return (
  <nav className="flex justify-between items-center w-11/12 mx-auto mt-4">
    <div className="flex gap-5 justify-between items-center">
      <NavLink to='/'>
        <div className="w-16 h-16">
          <img src='../logo.png' alt="Reload" />
        </div>
      </NavLink>
      <span className="cursor-pointer hover:underline">TypeMaster</span>
    </div>
    <div className="flex gap-5 justify-around items-center">
      <div>Login</div>
      <div>SignUp</div>
    </div>
  </nav>
  
)};

export default Navbar;
