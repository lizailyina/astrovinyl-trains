import React from 'react'
import { AiFillFilter } from 'react-icons/ai'
import { IoIosClose } from 'react-icons/io'
import { MdOutlineAirlineSeatReclineNormal, MdMiscellaneousServices } from 'react-icons/md'
import { FaUsersSlash } from 'react-icons/fa'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { setMinCarCount, setMaxCarCount, toggleColor, toggleServiceTypes, toggleUndefinedCarCount } from '../redux/slices/sort'

const checkoxColors = [
  "RD",
  "BL",
  "YL",
  "OR",
  "GR",
  "SV",
  null
]

const services = [
  "NoPassengers",
  "Normal",
  "Special",
  "Unknown"
]

const getIcon = (name) => {
  if (name === "NoPassengers") return <FaUsersSlash size={30} />;
  if (name === "Normal") return <MdOutlineAirlineSeatReclineNormal size={30} />;
  if (name === "Special") return <MdMiscellaneousServices size={30} />;
  if (name === "Unknown") return <BsFillQuestionCircleFill size={30} />;
};

const Sort = () => {


  const dispatch = useDispatch();

  const { colors, minCarCount, maxCarCount, serviceTypes, undefinedCarCount } = useSelector((state) => state.sort);

  const [open, setOpen] = React.useState(false);
  const sortRef = React.useRef(null);

  React.useEffect(() => {
    const handleClick = (e) => {
      if (sortRef.current !== null && !e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    }

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, [])

  return (
    <div className='sort' ref={sortRef}>
      <div style={{ display: "flex", alignItems: "center" }} onClick={() => setOpen(true)} >
        <h2>Filter</h2>
        <AiFillFilter size={24} onClick={() => setOpen(true)} />
      </div>
      {
        open &&
        <div className="popup">
          <IoIosClose style={{ position: "absolute", top: 0, right: 0 }} size={30} onClick={() => setOpen(false)} />
          <div className="popup-content">
            <div className="section">
              <h3>Color: </h3>
              <div className="popup-grid">
                {
                  checkoxColors.map((el) =>
                    <input type="checkbox"
                      className={`${el ? el : "WH"}-sh`}
                      key={el ? el : "WH"}
                      checked={colors?.includes(el)}
                      onChange={() => dispatch(toggleColor(el))} />
                  )
                }
              </div>
            </div>
            <div className="section">
              <h3>Service Type: </h3>
              <div className='popup-flex'>
                {
                  services.map((el) =>
                    <div key={el} className='item'>
                      {
                        getIcon(el)
                      }
                      <input
                        type="checkbox"
                        checked={serviceTypes.includes(el)}
                        onChange={() => dispatch(toggleServiceTypes(el))} />
                    </div>
                  )
                }
              </div>
            </div>
            <div className="section">
              <h3>Car Count: </h3>
              <div className="popup-flex">
                <div className='item'>
                  <label htmlFor="min">
                    {minCarCount}
                  </label>
                  <input
                    id="min"
                    type="range"
                    min="0"
                    max="10"
                    value={minCarCount}
                    onChange={(e) =>
                      dispatch(setMinCarCount(Math.min(e.target.value, maxCarCount)))} />
                </div>
                <h4>to</h4>
                <div className='item'>
                  <label htmlFor="max">
                    {maxCarCount}
                  </label>
                  <input
                    type="range"
                    id="max"
                    min="0"
                    max="10"
                    value={maxCarCount}
                    onChange={(e) =>
                      dispatch(setMaxCarCount(Math.max(e.target.value, minCarCount)))} />
                </div>
              </div>
              <div className='item' style={{ marginTop: "10px" }}>
                <label htmlFor="undefinedCarCount">Include trains with unavailible info</label>
                <input
                  type="checkbox"
                  id="undefinedCarCount"
                  checked={undefinedCarCount}
                  onChange={() => dispatch(toggleUndefinedCarCount())}
                />
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default Sort