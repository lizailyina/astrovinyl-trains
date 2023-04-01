import React from 'react'
import { TbRectangle } from 'react-icons/tb'
import { MdOutlineAirlineSeatReclineNormal, MdMiscellaneousServices } from 'react-icons/md'
import { FaUsersSlash } from 'react-icons/fa'
import { BsFillQuestionCircleFill } from 'react-icons/bs'

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
            (ServiceType === "Unknown" && <BsFillQuestionCircleFill size={30} />) ||
            (ServiceType === "NoPassengers" && <FaUsersSlash size={30} />)
          }
        </div>
      </div>
      <div className="info">
        <div className="item">
          <h2>
            ID: {TrainId}
          </h2>
        </div>
        <div className='item'>
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