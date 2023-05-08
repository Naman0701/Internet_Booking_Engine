import React, { FC } from "react";
import { crousalPropType } from "../../../../types/DataTypes";
import Carousel from "react-material-ui-carousel";
import './RoomCrousal.scss'

const RoomCrousal: FC<crousalPropType> = ({ images ,height,width}) => {
  return (
    <Carousel className="crousel" duration={500} sx={{height,width}}>
      {images.map((image, index) => (
        <img src={image} alt="Room" key={index} className="crousel__image" style={{ height }}/>
      ))}
    </Carousel>
  );
};

export default RoomCrousal;
