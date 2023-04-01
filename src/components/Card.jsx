import React from 'react'
import { TbRectangle } from 'react-icons/tb'
import { GrStatusUnknown } from 'react-icons/gr'
import { MdOutlineAirlineSeatReclineNormal, MdMiscellaneousServices } from 'react-icons/md'
import { AiOutlineStop } from 'react-icons/ai'

const Card = ({
  TrainId,
  LineCode,
  CarCount,
  ServiceType
}) => {

  return (
    <div className={`card ${LineCode}`}>
      <div className="logo">
        <div>
          {
            (ServiceType === "Normal" && <MdOutlineAirlineSeatReclineNormal size={30} />) ||
            (ServiceType === "Special" && <MdMiscellaneousServices size={30} />) ||
            (ServiceType === "Unknown" && <GrStatusUnknown size={30} />) ||
            (ServiceType === "NoPassengers" && <AiOutlineStop size={30} />)
          }
        </div>
      </div>
      <div className="info">
        <div className="item">
          <h2>
            {TrainId}
          </h2>
        </div>
        <div className='item'>
          <div className='cars'>
            {
              [...Array(CarCount)].map((element) =>
                <TbRectangle size={30} />
              )
            }
          </div>
          <h2>
            {CarCount}
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Card;