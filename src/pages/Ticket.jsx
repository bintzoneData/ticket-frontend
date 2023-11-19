import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCheckCircle, FaQuestionCircle } from 'react-icons/fa';

import { toast } from 'react-toastify';
import '../CSS/pages/ticket.css';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../firebase.config';
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  setDoc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { createTicket } from '../features/tickets/ticketSlice';
import { useNavigate, useParams } from 'react-router-dom';
import ButtonBack from '../components/ButtonBack';
import Kspinner from '../assets/Kspinner';
import BookSpinner from '../assets/BookSpinner';
function Ticket() {
  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  useEffect(() => {
    const docRef = collection(db, 'tickets');
    const queryMessages = query(docRef, where('requestId', '==', params.id));
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let items = [];
      snapshot.forEach((doc) => {
        setTicket({ ...doc.data(), id: doc.id });
      });
      setLoading(false);
    });
    return () => unsuscribe();
  }, []);
  const onSubmit = () => {
    console.log(ticket);
    dispatch(
      createTicket({
        product: ticket.product,
        problem: ticket.problem,
        purchase_date: ticket.purchase_date,
        note: ticket.note,
        serial: ticket.serial,
        clientId: ticket.owner,
      })
    )
      .unwrap()
      .then(() => {
        // We got a good response so navigate the user
        navigate('/tickets');
        toast.success('New ticket created!');
      })
      .catch(toast.error);
  };
  return (
    <div className='tickets'>
      <main className='the-card'>
        <header className='the-header-title '>
          <h1>ticket view</h1>
          <div className='tickets-back'>
            <ButtonBack url={'/request'} />
          </div>
        </header>
        {loading ? (
          <div className='isloading-box'>
            <BookSpinner />
            <h1>please wait</h1>
          </div>
        ) : (
          <>
            <section className='main-ticket'>
              <div className='the-boxes'>
                <div className='the-box'>
                  <div className='the-box-data'>
                    <label className='the-box-label '>client name </label>
                    <p className='the-box-p'>{ticket && ticket.name}</p>
                  </div>
                </div>
                <div className='the-box'>
                  <div className='the-box-data'>
                    <label className='the-box-label '>phone no</label>
                    <p className='the-box-p'>{ticket && ticket.phone}</p>
                  </div>
                </div>
                <div className='the-box'>
                  <div className='the-box-data'>
                    <label className='the-box-label l'>submitted date</label>
                    <p className='the-box-p'>
                      {' '}
                      {ticket.createdAt &&
                        new Date(ticket.createdAt.toDate()).toLocaleDateString(
                          'en-BZ',
                          options
                        )}
                    </p>
                  </div>
                </div>
              </div>
              {/* {line 2} */}
              <div className='the-boxes'>
                <div className='the-box'>
                  <div className='the-box-data'>
                    <label className='the-box-label '>product name</label>
                    <p className='the-box-p'>{ticket && ticket.product}</p>
                  </div>
                </div>
                <div className='the-box'>
                  <div className='the-box-data'>
                    <label className='the-box-label '>category</label>
                    <p className='the-box-p'>{ticket && ticket.category}</p>
                  </div>
                </div>
                <div className='the-box'>
                  <div className='the-box-data'>
                    <label className='the-box-label l'>purchased date</label>
                    <p className='the-box-p'>
                      {' '}
                      {ticket.createdAt &&
                        new Date(ticket.purchase_date).toLocaleDateString(
                          'en-BZ',
                          options
                        )}
                    </p>
                  </div>
                </div>
              </div>
              {/* {line three} */}
              <div className='the-boxes'>
                <div className='the-box-full'>
                  <div className='the-box-data'>
                    <label className='the-box-full-label '>
                      product issue{' '}
                    </label>
                    <p className='the-box-full-p'>{ticket && ticket.problem}</p>
                  </div>
                </div>
              </div>
              {/* {line four} */}
              <div className='the-boxes'>
                <div className='the-box-full'>
                  <div className='the-box-data'>
                    <label className='the-box-full-label '>client note </label>
                    <p className='the-box-full-p'>{ticket && ticket.note}</p>
                  </div>
                </div>
              </div>
              <div className='the-boxes'>
                <div className='the-box'>
                  <div className='the-box-data'>
                    <label className='the-box-label l'>serial no</label>
                    <p className='the-box-p'> {ticket && ticket.serial}</p>
                  </div>
                </div>
                <div className='the-box'>
                  <div className='the-box-data'>
                    <label className='the-box-label '>warranty</label>
                    <p className='the-box-p green'>active</p>
                  </div>
                </div>
                <div className='the-box'>
                  <div className='the-box-data'>
                    <button onClick={onSubmit} className='the-btn  all-B-main'>
                      comfrim
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Ticket;
