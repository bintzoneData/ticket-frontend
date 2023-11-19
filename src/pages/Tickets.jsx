import React, { useEffect, useState } from 'react';
import '../CSS/pages/tickets.css';
import { Link } from 'react-router-dom';
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
import { useSelector, useDispatch } from 'react-redux';
import ButtonBack from '../components/ButtonBack';
import { ReactComponent as SadSvg } from '../assets/Sad.svg';
import { ReactComponent as SmileSvg } from '../assets/Smile.svg';
import { FaFrown, FaSadCry, FaSadTear } from 'react-icons/fa';
import BookSpinner from '../assets/BookSpinner';
import Kspinner from '../assets/Kspinner';
import { getTickets } from '../features/tickets/ticketSlice';
import { toast } from 'react-toastify';
import { set } from 'mongoose';
function Tickets() {
  const { tickets, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ticket
  );

  const [ticketsData, setTicketsData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [loading, setloading] = useState(false);
  const [Type, setType] = useState('ongoing');
  const dispatch = useDispatch();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, isSuccess, message]);

  // useEffect(() => {
  //   setloading(true);
  //   const docRef = collection(db, 'tickets');
  //   const queryMessages = query(docRef, where('owner', '==', user._id));
  //   const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
  //     let items = [];
  //     snapshot.forEach((doc) => {
  //       items.push({ ...doc.data(), id: uuidv4() });
  //     });
  //     setTicketsData(items);
  //     setloading(false);
  //   });
  //   return () => unsuscribe();
  // }, []);
  useEffect(() => {
    setloading(true);
    const docRef = collection(db, 'tickets');
    const queryMessages = query(docRef, where('owner', '==', user._id));
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let items = [];
      snapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: uuidv4() });
      });
      setTicketsData(items);
      setTimeout(() => {
        setloading(false);
      }, 1000);
    });
    return () => unsuscribe();
  }, [Type === 'pending']);
  useEffect(() => {
    if (Type === 'complete') {
      dispatch(getTickets('complete'));
    }
    if (Type === 'ongoing') {
      dispatch(getTickets('ongoing'));
    }
    if (!tickets.length > 0) {
      setType('pending');
    }
  }, []);
  useEffect(() => {
    if (isLoading) {
      setloading(true);
    }
    if (!isLoading) {
      setTimeout(() => {
        setloading(false);
      }, 1000);
    }
  }, [isLoading]);
  return (
    <div className='tickets'>
      <main className='tickets-card'>
        {loading && (
          <div className='isloading-box'>
            <BookSpinner />
            <h1>please wait</h1>
          </div>
        )}
        <header className='tickets-title'>
          <h1 onClick={() => dispatch(getTickets('a'))}>my tickets</h1>
          {tickets.length > 0 ||
            (ticketsData.length > 0 && (
              <div className='tickets-changes'>
                <div className='tickets-radio-inputs'>
                  <label className='tickets-radio'>
                    <input
                      type='radio'
                      name='radio'
                      id='pending'
                      checked={Type === 'pending'}
                      onClick={() => setType('pending')}
                    />
                    <span className='tickets-name'>pending</span>
                  </label>
                  <label className='tickets-radio'>
                    <input
                      type='radio'
                      name='radio'
                      checked={Type === 'ongoing'}
                      onClick={() => setType('ongoing')}
                    />
                    <span className='tickets-name'>ongoing</span>
                  </label>
                  <label className='tickets-radio'>
                    <input
                      type='radio'
                      name='radio'
                      checked={Type === 'complete'}
                      onClick={() => setType('complete')}
                    />
                    <span className='tickets-name'>complete</span>
                  </label>
                </div>
              </div>
            ))}
          <div className='tickets-back'>
            <ButtonBack url={'/'} />
          </div>
        </header>
        {!loading && (
          <>
            {!tickets.length > 0 && !ticketsData.length > 0 ? (
              <div className='tickets-no-data'>
                <SmileSvg className='tickets-no-data-svg' />

                <h1>It appears that you haven't submitted any tickets</h1>
              </div>
            ) : (
              <section className='tickets-section'>
                {Type === 'pending' && (
                  <>
                    {ticketsData.length > 0 ? (
                      <table className='tickets-table'>
                        <thead className='tickets-Thead'>
                          <tr>
                            <th>date</th>
                            <th>product</th>
                            <th>status </th>
                            <th>view</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className='tickets-hide'>
                            <th>m</th>
                          </tr>
                          {ticketsData &&
                            ticketsData.map((ticket) => (
                              <tr
                                key={ticket._id ? ticket._id : ticket.id}
                                className='tickets-Tdata'
                              >
                                <td>
                                  {new Date(
                                    ticket.createdAt.toDate(['en-GB'])
                                  ).toLocaleString()}
                                </td>
                                <td>{ticket.product}</td>
                                <td>
                                  <div className='all-f-center'>pending</div>
                                </td>
                                <td>-</td>
                              </tr>
                            ))}{' '}
                        </tbody>
                      </table>
                    ) : (
                      <div className='tickets-no-data'>
                        <SmileSvg className='tickets-no-data-svg' />

                        <h1>You currently have no pending tickets</h1>
                      </div>
                    )}
                  </>
                )}

                {['ongoing', 'complete'].includes(Type) && (
                  <>
                    {tickets && tickets.length > 0 ? (
                      <table className='tickets-table'>
                        <thead className='tickets-Thead'>
                          <tr>
                            <th>date</th>
                            <th>product</th>
                            <th>status </th>
                            <th>view</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tickets &&
                            tickets.map((ticket) => (
                              <tr
                                key={ticket._id ? ticket._id : ticket.id}
                                className='tickets-Tdata'
                              >
                                <td>
                                  {new Date(ticket.createdAt).toLocaleString([
                                    'en-GB',
                                  ])}
                                </td>
                                <td>{ticket.product}</td>
                                <td>
                                  <div className='all-f-center'>
                                    {ticket.status}
                                  </div>
                                </td>
                                <td>
                                  <Link
                                    to={`/ticket/${ticket._id}`}
                                    className='all-f-center'
                                  >
                                    <button className='all-btn-submit all-B-main'>
                                      view
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className='tickets-no-data'>
                        <SadSvg className='tickets-no-data-svg' />
                        {Type === 'ongoing' ? (
                          <h1>
                            You currently do not have any active or ongoing
                            tickets
                          </h1>
                        ) : (
                          <h1>
                            You currently don't have any completed tickets
                          </h1>
                        )}
                      </div>
                    )}
                  </>
                )}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Tickets;
