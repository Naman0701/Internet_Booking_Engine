import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { backendHealthCheck, test } from "../../redux/slice/backendHealthTestSlice";


const TestComponent: FC = () => {
  const testData: string = useAppSelector(test);
  const dispatch = useAppDispatch();

  /**
   * On loading this page and dispatch, fetch the bookings.
   */
  useEffect(() => {
    dispatch(backendHealthCheck());
  }, [dispatch]);

  

  return (
    <div >status:{JSON.stringify(testData)}
    </div>
  );
};

export default TestComponent;
