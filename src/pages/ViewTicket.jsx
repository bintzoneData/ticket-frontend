import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaQuestionCircle } from 'react-icons/fa';
import '../CSS/pages/ticket.css';
import { getTicket } from '../features/tickets/ticketSlice';

import { useParams } from 'react-router-dom';
import ButtonBack from '../components/ButtonBack';
import BookSpinner from '../assets/BookSpinner';
function ViewTicket() {
  const { ticket, isLoading } = useSelector((state) => state.ticket);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };
  useEffect(() => {
    dispatch(getTicket(params.id));
  }, []);
  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
    if (!isLoading) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [isLoading]);
  return (
    <div className='tickets'>
      <main className='the-card'>
        <header className='the-header-title '>
          <h1>ticket view</h1>
          <div className='tickets-back'>
            <ButtonBack url={'/tickets'} />
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
              <div className='the-boxes-2'>
                <div className='the-small-boxes'>
                  <div className='the-small-box'>
                    <label htmlFor=''>ticketId:</label>
                    <p>{ticket._id}</p>
                  </div>
                  <div className='the-small-box'>
                    <label htmlFor=''>created date:</label>
                    <p>
                      {ticket.createdAt &&
                        new Date(ticket.purchase_date).toLocaleDateString(
                          'en-BZ',
                          options
                        )}
                    </p>
                  </div>
                </div>
              </div>
              {/* {line 2} */}
              <div className='the-boxes-2'>
                <div className='the-box-2'>
                  <label className='the-box-label-2 '>product name</label>
                  <p className='the-box-p-2'>{ticket && ticket.product}</p>
                </div>
                <div className='the-box-2'>
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
              {/* {problem} */}
              <div className='the-boxes-2'>
                <div className='the-box-full'>
                  <div className='the-box-data'>
                    <label className='the-box-full-label '>
                      product issue{' '}
                    </label>
                    <p className='the-box-full-p'>{ticket && ticket.problem}</p>
                  </div>
                </div>
              </div>
              <div className='the-boxes-2'>
                <div className='the-box-2'>
                  <label className='the-box-label-2 l'>
                    stage type <FaQuestionCircle className='fa-q' />
                  </label>
                  <p className='the-box-p-2'>
                    {' '}
                    {ticket.stage && ticket.stage.type}
                  </p>
                </div>

                <div className='the-box-2'>
                  <label className='the-box-label-2 '>warranty status</label>
                  <p
                    className={`the-box-p-3 ${
                      ticket.warranty ? 'green' : 'c-red'
                    }`}
                  >
                    {ticket.warranty && ticket.warranty
                      ? 'active'
                      : ' inactive'}
                  </p>
                </div>
              </div>
              {/* {message} */}
              <div className='the-boxes-2'>
                <div className='the-box-full'>
                  <div className='the-box-data'>
                    <label className='the-box-full-label '>message </label>
                    <p className='the-box-full-p'>
                      {ticket.stage && ticket.stage.message}
                    </p>
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

export default ViewTicket;
