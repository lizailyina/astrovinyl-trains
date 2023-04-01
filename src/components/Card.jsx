import React from 'react'
import { TbRectangle } from 'react-icons/tb'
import { MdOutlineAirlineSeatReclineNormal, MdMiscellaneousServices } from 'react-icons/md'
import { FaUsersSlash, FaSubway } from 'react-icons/fa'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { IoIosArrowRoundForward } from 'react-icons/io'
import { BsDashLg } from 'react-icons/bs'
import { prevStation, nextStation, stationName, trackId } from '../App'


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
          {`ID:${TrainId}`}
        </h2>
      </div>
      <div className="info">
        <div className="item start stations">
          {
            (!prevStation[CircuitId] && !nextStation[CircuitId]) ?
              (
                <h2> <b>Train Position Info Currently Unavailible </b></h2>
              ) : (<>
                <h2>
                  {stationName[prevStation[CircuitId]] || "DEPOT"}
                </h2>
                <BsDashLg size={30} />
                <FaSubway size={20} />
                <IoIosArrowRoundForward size={30} />
                <h2>
                  {stationName[nextStation[CircuitId]] || "DEPOT"}
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
              <h2>Car Info Unavailible</h2>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Card;