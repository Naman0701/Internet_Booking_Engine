import { addMinutes } from "date-fns";
import { filterType, sortType } from "../../types/DataTypes";
export const getDateFormat = (date: string): string => {
  const newDate=new Date(date);
  return addMinutes(newDate,-newDate.getTimezoneOffset()).toISOString();
};
export const getRequestBody = (searchParamsString: string,filterTypes:filterType[],sortType:sortType) => {
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
  const guests:string=searchParams["guests-horizontal"]!==undefined?searchParams["guests-horizontal"]:searchParams["guests-vertical"]
  if (isNaN(roomCount) || isNaN(propertyId) || !startDate || !endDate) {
    // Fallback to default search parameters
    return null
  }
  if(sortType.attribute!=="None")
  {
  return { startDate, endDate, roomCount,guests, propertyId,filterTypes, sortType};
  }
  else{
    return { startDate, endDate, roomCount,guests, propertyId,filterTypes};
  }
};