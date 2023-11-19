import { Link, useNavigate } from 'react-router-dom';
import '../CSS/navbar/navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { FaUserTie, FaSignInAlt } from 'react-icons/fa';
function Navbar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };
  return (
    <div className='main-navbar'>
      <div className='navbar-logo'>
        <Link to={'/'} className='navbar-logo-name'>
          Bintzone.
        </Link>
      </div>

      <div className='navbar-btns'>
        {!user ? (
          <Link to='/login' className='navbar-btn'>
            <FaSignInAlt />
            Sing-in
          </Link>
        ) : (
          <Link to='/profile' className='navbar-btn'>
            <FaUserTie />
            Profile
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
