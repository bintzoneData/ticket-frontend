import React, { useEffect, useState } from 'react';
import '../CSS/pages/newticket.css';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {
  setDoc,
  doc,
  serverTimestamp,
  collection,
  addDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase.config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ButtonBack from '../components/ButtonBack';

import ButtonSpinner from '../assets/ButtonSpinner';
import { createTicket } from '../features/tickets/ticketSlice';
import { getCategories, getItems } from '../features/mix/authMix';
import { toast } from 'react-toastify';
import { useRef } from 'react';
function NewTicket() {
  const ref = useRef();

  const [category, SetCategory] = useState('');
  const [ready, setReady] = useState(false);
  const [formData, setFormData] = useState({
    product: '',

    purchase_date: '',
    serial: '',
    problem: '',
    note: '',
  });
  const [itemD, setItemD] = useState([]);
  const [categoryD, setCategoryD] = useState([]);
  const { product, purchase_date, serial, problem, note } = formData;
  const location = useLocation();
  const { CateData, isLoading1 } = useSelector((state) => state.categories);
  const { ItemsData, isLoading2 } = useSelector((state) => state.items);
  const { isLoading } = useSelector((state) => state.ticket);
  const { user } = useSelector((state) => state.auth);
  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataCopy = { ...formData };
      formDataCopy.createdAt = serverTimestamp();
      formDataCopy.owner = user._id;
      const docref = collection(db, 'tickets');
      await addDoc(docref, formDataCopy);
      navigate('/tickets');
      toast.success('New ticket created!');
    } catch (error) {
      toast.dismiss();
      toast.error('Creating Rejected');
    }
    // console.log(formData);
    // dispatch(
    //   createTicket({
    //     product,
    //     problem,
    //     purchase_date,
    //     note,
    //     serial,
    //   })
    // )
    //   .unwrap()
    //   .then(() => {
    //     // We got a good response so navigate the user
    //     navigate('/tickets');
    //     toast.success('New ticket created!');
    //   })
    //   .catch(toast.error);
  };
  const onCreate = () => {
    if (category !== '') {
      setReady(true);
      dispatch(getItems(category));
    }
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  useEffect(() => {
    if (ItemsData) {
      setItemD(ItemsData);
    }
  }, [ItemsData]);
  useEffect(() => {
    if (CateData) {
      setCategoryD(CateData);
    }
  }, [CateData]);
  const preventRefresh = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    window.addEventListener('beforeunload', preventRefresh);

    return () => {
      window.removeEventListener('beforeunload', preventRefresh);
    };
  }, []);

  return (
    <div className='main-new-Thicket'>
      <div className='new-Ticket'>
        {isLoading1 ||
          (isLoading && <div className='tickets-loading-box'></div>)}
        {isLoading2 && <div className='tickets-loading-box'></div>}
        <div className='new-ticket-back'>
          <ButtonBack url={'/'} />
        </div>
        <h1>create new Ticket</h1>
        {!ready ? (
          <h2>please choose from an option below</h2>
        ) : (
          <h2>please fill out the form below</h2>
        )}
        {!ready ? (
          <section className='tickets-choose'>
            <div className='NT-boxes2'>
              {/* name */}
              <div className='NT-box2'>
                <label className='all-form-label '>category</label>
                <select
                  type='text'
                  className='all-form-input all-fz-18px all-H-36px'
                  onChange={(e) => SetCategory(e.target.value)}
                  value={category}
                  id='product'
                  required
                >
                  <option value=''>---choose---</option>
                  {categoryD &&
                    categoryD.map((cate) => (
                      <option value={cate.category} key={cate._id}>
                        {cate.category}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className='tickets-create-btn'>
              <button
                type='button'
                onClick={onCreate}
                className='all-btn-submit all-B-main all-fz-25px '
              >
                {isLoading1 ? <ButtonSpinner /> : 'create form'}
              </button>
            </div>
          </section>
        ) : (
          <form onSubmit={onSubmit} className='ticket-form'>
            {/* client info */}

            {/* client info */}
            <div className='NT-boxes'>
              {/* name */}
              <div className='NT-box'>
                <label htmlFor='' className='all-form-label '>
                  product name
                </label>
                <select
                  type='text'
                  className='all-form-input all-fz-18px all-H-36px'
                  onChange={onChange}
                  value={product}
                  id='product'
                  required
                >
                  <option value=''>choose</option>
                  {itemD &&
                    itemD.map((cate) => (
                      <option value={cate.code} key={cate._id}>
                        {cate.description}
                      </option>
                    ))}
                </select>
              </div>
              {/*  purchase_date */}
              <div className=' NT-box'>
                <label htmlFor='' className='all-form-label '>
                  purchase date
                </label>
                <input
                  type='date'
                  className='arriveDate all-form-input  all-fz-18px all-H-25px all-'
                  ref={ref}
                  onChange={onChange}
                  value={purchase_date}
                  id='purchase_date'
                  required
                />
              </div>
              {/* serial */}
              <div className='NT-box'>
                <label htmlFor='' className='all-form-label'>
                  product serial no
                </label>
                <input
                  type='text'
                  className='all-form-input all-H-25px all-fz-18px all-H-25px'
                  onChange={onChange}
                  value={serial}
                  id='serial'
                  required
                />
              </div>
            </div>
            {/* problem info */}
            <div className='all-boxes  NT-boxes-solo'>
              {/* desc */}
              <div className='all-box NT-box-solo'>
                <label htmlFor='' className='all-form-label '>
                  problem problem
                </label>
                <textarea
                  className='all-form-input  all-fz-18px all-H-25px-solo'
                  onChange={onChange}
                  value={problem}
                  id='problem'
                />
              </div>
            </div>
            {/* note */}
            <div className='all-boxes  NT-boxes-solo'>
              {/* desc */}
              <div className='all-box NT-box-solo'>
                <label htmlFor='' className='all-form-label '>
                  add note
                </label>
                <textarea
                  className='all-form-input  all-fz-18px all-H-25px-solo'
                  onChange={onChange}
                  value={note}
                  id='note'
                />
              </div>
            </div>
            <div className='tickets-polite'>
              You're currently in <span>{category}</span> category mode. To
              modify or remove this, kindly use the <span>change</span> button
            </div>
            <div className='new-Ticket-btn-box'>
              {!isLoading2 && (
                <button
                  type='button'
                  onClick={() => {
                    dispatch(getCategories());
                    setReady(false);
                  }}
                  className='all-btn-submit all-B-red all-fz-25px all-W-100pc all-H-40px tickets-btn1'
                >
                  {isLoading2 ? <ButtonSpinner /> : 'change'}
                </button>
              )}
              <button
                type='submit'
                className='all-btn-submit all-B-navy all-fz-25px all-W-100pc all-H-40px tickets-btn2'
              >
                {isLoading2 || isLoading ? <ButtonSpinner /> : 'submit '}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default NewTicket;
