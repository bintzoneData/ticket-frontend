import { Link, useNavigate } from 'react-router-dom';
import '../CSS/pages/home.css';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
import { ReactComponent as ReqSvg } from '../assets/Request.svg';
function Home() {
  const navigate = useNavigate();
  return (
    <div className='home'>
      <div className='heading'></div>
      <div className='home-boxes'>
        <div
          className='home-box home-box-normal'
          onClick={() => navigate('/request')}
        >
          <h1>new requests</h1>
          <div className=''>
            <p>13</p>
          </div>
        </div>
        <div className='home-box home-box-normal'>
          <h1>ongoing tickets</h1>
          <div className=''>
            <p>5</p>
          </div>
        </div>
        <div className='home-box home-box-normal'>
          <h1>ready tickets</h1>
          <div className=''>
            <p>17</p>
          </div>
        </div>
        <div className='home-box home-box-normal'>
          <h1>collected tickets</h1>
          <div className=''>
            <p>19</p>
          </div>
        </div>
        <div className='home-box home-box-normal'>
          <h1>rejected tickets</h1>
          <div className=''>
            <p>02</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
