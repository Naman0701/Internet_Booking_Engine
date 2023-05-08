import { FC } from 'react';
import './App.scss';
import AppRoutes from './routes/AppRoutes';
import ReactGA from "react-ga";

const TRACKING_ID="UA-259511674-1" ;

ReactGA.initialize(TRACKING_ID);

const App:FC=()=> {
  return (
    <div className="App">
      <AppRoutes/>
    </div>
  );
}

export default App;
