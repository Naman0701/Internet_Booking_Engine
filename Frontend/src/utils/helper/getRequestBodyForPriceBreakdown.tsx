import { getDateFormat } from "./getRequestBody";

export const getRequestBodyForPriceBreakdown = (searchParamsString: string,roomTypeName:string) => {
  let queryString;
  try {
    queryString = searchParamsString.startsWith("?")
      ? searchParamsString.substr(1)
      : searchParamsString;
  } catch (err) {
    console.error(err);
  }
  if (!queryString) {
    queryString = localStorage.getItem("searchParams");
  }
  else{
    localStorage.setItem("searchParams",queryString);
  }
  if (!queryString) {
    // Fallback to default search parameters
    return null
  }
  const searchParamsArray = queryString.split("&");
  const searchParams: { [key: string]: string } = {};
  searchParamsArray.forEach((param) => {
    const [key, value] = param.split("=");
    searchParams[key] = decodeURIComponent(value.replace(/\+/g, " "));
  });
  const startDate:string = getDateFormat(searchParams["dateRange"]?.split(",")[0]);
  const endDate:string = getDateFormat(searchParams["dateRange"]?.split(",")[1]);
  const roomCount:number = parseInt(searchParams["Rooms"]) || 1;
  const propertyId:number = parseInt(searchParams["property"]?.split(" ")[1]) || 3;
  const roomType:string=roomTypeName
  if (isNaN(roomCount) || isNaN(propertyId) || !startDate || !endDate || !roomType) {
    // Fallback to default search parameters
    return null
  }
  
    return { startDate, endDate, roomCount, propertyId,roomType};
  
};