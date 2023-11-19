import { useEffect, useState } from 'react';
import '../CSS/pages/profile.css';
import BookSpinner from '../assets/BookSpinner';

import { useSelector, useDispatch } from 'react-redux';
import { logout, update, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
function Profile() {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    city: '',
    phoneNo: '',
    phoneNo2: '',
    password: '',
    password2: '',
  });
  const { name, surname, email, phoneNo, password, password2, city, phoneNo2 } =
    formData;
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user._id);
    dispatch(update(formData));
  };
  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess) {
      clear();
    }
  }, [isError, isSuccess]);
  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, []);
  const clear = () => {
    setEditMode(false);
    dispatch(reset());
  };

  return (
    <div className='profile'>
      <form onSubmit={onSubmit} className='profile-card'>
        <header className='profile-title'>
          <p>my profile</p>
          <div className='profile-back'>
            <button
              type='button'
              className='all-btn-submit all-B-navy'
              onClick={() => navigate('/')}
            >
              back
            </button>
          </div>
        </header>
        {isLoading && (
          <div className='isloading-box'>
            <BookSpinner />
            <h1>please wait</h1>
          </div>
        )}
        <>
          <div className='profile-data'>
            <div className='profile-edit'>
              {!editMode ? (
                <button
                  type='button'
                  className='all-btn-submit all-B-green'
                  onClick={() => setEditMode(true)}
                >
                  edit
                </button>
              ) : (
                <button
                  type='button'
                  onClick={() => {
                    setEditMode(false);
                    setFormData(user);
                  }}
                  className='all-btn-submit all-B-red'
                >
                  close
                </button>
              )}
              <button
                type='button'
                onClick={onLogout}
                className='all-btn-submit all-B-main'
              >
                Logout
              </button>
            </div>
            <div className='profile-boxes'>
              <div className='profile-box f-50'>
                <label className='all-form-label'>name</label>
                <input
                  type='text'
                  className='all-form-input all-H-25px all-s18px'
                  id='name'
                  onChange={onChange}
                  value={name}
                  disabled={!editMode}
                />
              </div>
              <div className='profile-box f-50'>
                <label className='all-form-label'>surname</label>
                <input
                  type='text'
                  className='all-form-input all-H-25px all-s18px'
                  id='surname'
                  onChange={onChange}
                  value={surname}
                  disabled={!editMode}
                />
              </div>
            </div>
            {/*  */}
            <div className='all-box '>
              <label className='all-form-label'>email address</label>
              <input
                type='email'
                className='all-form-input all-H-25px all-s18px'
                id='email'
                onChange={onChange}
                value={email}
                disabled={!editMode}
              />
            </div>
            {/*  */}
            <div className='all-box'>
              <label className='all-form-label'>phone no</label>
              <input
                type='number'
                className='all-form-input all-H-25px all-s18px'
                id='phoneNo'
                onChange={onChange}
                value={phoneNo}
                disabled={!editMode}
              />
            </div>
            {/*  */}
            <div className='all-box'>
              <label className='all-form-label'>phone no 2</label>
              <input
                type='number'
                className='all-form-input all-H-25px all-s18px'
                id='phoneNo2'
                onChange={onChange}
                value={phoneNo2}
                disabled={!editMode}
              />
            </div>
            <div className='all-box'>
              <label className='all-form-label'>city/town</label>
              <input
                type='text'
                className='all-form-input all-H-25px all-s18px'
                id='city'
                onChange={onChange}
                value={city}
                disabled={!editMode}
              />
            </div>
            <div className='all-box'>
              {editMode && (
                <button
                  type='submit'
                  className='all-btn-submit all-B-orange all-s25px m-top15 all-H-40px'
                >
                  update
                </button>
              )}
            </div>
          </div>
        </>
      </form>
    </div>
  );
}

export default Profile;
