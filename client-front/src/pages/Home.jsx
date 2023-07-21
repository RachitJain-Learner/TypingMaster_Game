import { NavLink } from "react-router-dom";

const Home = () => {
  

  return (
    <div>
      <div>
        <NavLink to="/Solo">
         <div>Solo</div>
        </NavLink>
      </div>
      <div>
        <NavLink to="/Multiplayer">
           <div>Multiplayer</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
