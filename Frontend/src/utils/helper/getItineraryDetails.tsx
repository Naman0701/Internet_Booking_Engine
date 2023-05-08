import { ResponseBodyForDailyPriceBreakdown } from "../../interface/DataInterface";

export const getItineraryDetails = (bookingData: any,promoDetails:any,priceBreakdownList:ResponseBodyForDailyPriceBreakdown) => {

  const priceFactor=promoDetails.priceFactor;
  
  const { dateRange, Rooms } = bookingData;
  const guests = bookingData["guests-vertical"]
    ? bookingData["guests-vertical"]
    : bookingData["guests-horizontal"];

  const dateRangeArray = Array.isArray(dateRange)
    ? dateRange
    : dateRange.split(",");
  if (dateRangeArray.length !== 2) {
    return null;
  }

  const [startDate, endDate] = dateRangeArray.map(
    (date: string | number | Date) => new Date(date)
  );
  const startMonth: string = startDate.toLocaleString("default", {
    month: "short",
  });
  const endMonth: string = endDate.toLocaleString("default", {
    month: "short",
  });
  const startDay: string = startDate.getDate().toString();
  const endDay: string = endDate.getDate().toString();
  const year: string = startDate.getFullYear().toString();
  const roomCount: number = parseInt(Rooms);

  const dateRangeString = `${startMonth} ${startDay}-${endMonth} ${endDay},${year}`;



  if (isNaN(roomCount) || !guests || !dateRangeString) {
    return null;
  }

  let packageTotal:number = 0;
  Object.entries(priceBreakdownList).forEach(([date, price]) => {
     packageTotal += price;
  });  
  const subtotal=packageTotal*roomCount*priceFactor;
  const promoDiscount=packageTotal-subtotal;
  const taxes=subtotal*0.07;
  const van=subtotal*0.05;
  const totalStayPrice=subtotal+taxes+van;
   let dueNow: number = 0;
  let dueAtResort: number = 0;

  if (promoDetails.title === "Upfront Payment Discount") {
    dueNow = totalStayPrice;
    dueAtResort = 0;
  } else {
    dueNow = totalStayPrice * 0.2;
    dueAtResort = totalStayPrice * 0.8;
  }

  return {
    dateRange: dateRangeString,
    guests,
    roomCount,
    subtotal,
    taxes,
    van,
    totalStayPrice,
    packageTotal,
    promoDiscount,
    dueNow,
    dueAtResort
  };
};
