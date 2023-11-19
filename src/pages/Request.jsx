import '../CSS/pages/request.css';
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
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Request() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [loading, setloading] = useState(false);
  const [ticketsData, setTicketsData] = useState([]);
  useEffect(() => {
    setloading(true);
    const docRef = collection(db, 'tickets');
    const queryMessages = query(docRef, where('owner', '==', user._id));
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let items = [];
      snapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id });
      });
      setTicketsData(items);
      setloading(false);
    });
    return () => unsuscribe();
  }, []);
  return (
    <div className='request'>
      <div className='request-card'>
        <div className='request-header'>
          <div className='request-changes'>
            <div className='request-radio-inputs'>
              <label className='request-radio'>
                <input
                  type='radio'
                  name='radio'
                  id='pending'
                  // checked={Type === 'pending'}
                  // onClick={() => setType('pending')}
                />
                <span className='request-name'>yesterday</span>
              </label>
              <label className='request-radio'>
                <input
                  type='radio'
                  name='radio'
                  // checked={Type === 'ongoing'}
                  // onClick={() => setType('ongoing')}
                />
                <span className='request-name'>today</span>
              </label>
              <label className='request-radio'>
                <input
                  type='radio'
                  name='radio'
                  // checked={Type === 'complete'}
                  // onClick={() => setType('complete')}
                />
                <span className='request-name'>all</span>
              </label>
            </div>
          </div>
          <main className='request-lists'>
            {ticketsData &&
              ticketsData.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => navigate(`/ticket/${ticket.requestId}`)}
                  className='request-list-box'
                >
                  <div className='request-details'>
                    <h1>{ticket.name}</h1>
                    <p>{ticket.phone}</p>
                  </div>
                  <div className='request-details'>
                    <h1>{ticket.product}</h1>
                    <p>tv</p>
                  </div>
                  <div className='request-details'>
                    <h1>submitted at</h1>
                    <p>
                      {new Date(
                        ticket.createdAt.toDate(['en-GB'])
                      ).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Request;
