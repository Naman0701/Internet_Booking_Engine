import React, { FC } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { bookingId } from '../../redux/slice/checkoutSlice';
import'./BookingStatus.scss';

type Props = {
  status:boolean
}

const BookingStatus:FC<Props> = ({status}) => {
  const bookingID:string=useAppSelector(bookingId);
  
  return (
    
    <div className='booking-status'> <span className="emoji">{status?"✅":"❌"}</span>
      <h2 className="title">{status?"Booking Successful":"Booking Failed"}</h2>
    <p className="message"><a href={status?`/bookingConfirmed?bookingId=${bookingID}`:"/"} className='navigate'> Click Here</a> {status?"to go to booking page.":"to go back to the home page."}</p>
    </div>
  )
}

export default BookingStatus;