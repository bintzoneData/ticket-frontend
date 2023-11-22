import { Link, useNavigate } from "react-router-dom";
import "../CSS/pages/home.css";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="heading">
        <h1>what do you need help with ?</h1>
        <p>please choose from an option below</p>
      </div>

      <Link to="/new-ticket" className="all-btn-submit Home-btn">
        <FaQuestionCircle /> create new ticket
      </Link>
      {/*  */}
      <div
        onClick={() => navigate("/tickets")}
        className="all-btn-submit Home-btn-2"
      >
        <FaTicketAlt /> view my ticket
      </div>
    </div>
  );
}

export default Home;
