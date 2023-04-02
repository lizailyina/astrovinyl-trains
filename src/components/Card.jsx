import React from 'react'
import { TbRectangle, TbTrain } from 'react-icons/tb'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { BsDashLg } from 'react-icons/bs'
import { prevStation, nextStation, stationName, isStation } from '../App'
import { getIcon } from './Sort'


const Card = ({
  TrainId,
  LineCode,
  CarCount,
  ServiceType,
  CircuitId
}) => {

  const isBoarding = () => (isStation[CircuitId] && nextStation[CircuitId] && ServiceType === "Normal");

  return (
    <div className={`card ${LineCode}`}>
      <div className="logo">
        <div className="logo-icon">
          {
            getIcon(ServiceType)
          }
        </div>
        <h2>
          {TrainId}
        </h2>
        <div>
          {
            isBoarding() ?
              <h2><b>BOARDING</b></h2>
              :
              <h2 style={{ width: "109px", margin: "5 px", padding: "0" }}><b>ON TRACK</b></h2>
          }
        </div>
      </div>
      <div className="info">
        <div className="item start stations">
          {
            (!prevStation[CircuitId] && !nextStation[CircuitId]) ?
              (
                <h2> <b>Train Position Info Currently Unavailible </b></h2>
              ) : (
                <>
                  <h2>
                    {(stationName[prevStation[CircuitId]] || <b>DEPOT</b>)}
                  </h2>
                  {
                    !isBoarding() &&
                    <BsDashLg size={30} />
                  }
                  <TbTrain size={30} />
                  {
                    !isBoarding() &&
                    <IoIosArrowRoundForward size={30} />
                  }
                  <h2>
                    {stationName[nextStation[CircuitId]] || <b>DEPOT</b>}
                  </h2>
                </>
              )
          }
        </div>
        <div className='item end'>
          {
            CarCount ? (
              <>
                <div className='cars'>
                  {
                    [...Array(CarCount)].map((_, index) =>
                      <TbRectangle size={30} key={index} />
                    )
                  }
                </div>
                <h2>
                  {CarCount}
                </h2>
              </>
            ) : (
              <h2><b>Car Info Unavailible</b></h2>
            )
          }
        </div>
      </div>
    </div >
  )
}

export default Card;