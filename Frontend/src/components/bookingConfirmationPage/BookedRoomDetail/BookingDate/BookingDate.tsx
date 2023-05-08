import React, { FC } from 'react'
import { BookingDateProp } from '../../../../interface/DataInterface';
import './BookingDate.scss';
import { useTranslation } from 'react-i18next';


const BookingDate:FC<BookingDateProp> = ({date,dateType}) => {
  const { t } = useTranslation();


  return (
    <div className='booking-date'>
        <span className="booking-date__date-type">{t(dateType)}</span>
        <span className="booking-date__date">{date.getDate()}</span>
        <span className="booking-date__month-year">{t(date.toLocaleString('default', { month: 'long' }))} {date.getFullYear()}</span>
</div>
  )
}

export default BookingDate