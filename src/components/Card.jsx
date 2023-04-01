import React from 'react'
import { TbRectangle, TbTrain } from 'react-icons/tb'
import { MdOutlineAirlineSeatReclineNormal, MdMiscellaneousServices } from 'react-icons/md'
import { FaUsersSlash } from 'react-icons/fa'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { BsDashLg } from 'react-icons/bs'
import { prevStation, nextStation, stationName, isStation } from '../App'


const Card = ({
  TrainId,
  LineCode,
  CarCount,
  ServiceType,
  CircuitId
}) => {

  return (
    <div className={`card ${LineCode}`}>
      <div className="logo">
        <div className="logo-icon">
          {
            (ServiceType === "Normal" && <MdOutlineAirlineSeatReclineNormal size={30} />) ||
            (ServiceType === "Special" && <MdMiscellaneousServices size={30} />) ||
            (ServiceType === "Unknown" && <BsFillQuestionCircleFill size={30} />) ||
            (ServiceType === "NoPassengers" && <FaUsersSlash size={30} />)
          }
        </div>
        <h2>
          {TrainId}
        </h2>
        <div>
          {
            (isStation[CircuitId] && nextStation[CircuitId]) ?
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
                    !(isStation[CircuitId] && nextStation[CircuitId]) &&
                    <BsDashLg size={30} />
                  }

                  <TbTrain size={30} />
                  {
                    !(isStation[CircuitId] && nextStation[CircuitId]) &&
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
                    [...Array(CarCount)].map((element, index) =>
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