import "./app.scss"
import React from "react"
import axios from "./axios.js"
import Card from "./components/Card.jsx"
import Sort from './components/Sort.jsx'
import { useDispatch, useSelector } from "react-redux"
import NotFound from "./components/NotFound"
import ReactLoading from "react-loading";
import { FaSubway } from 'react-icons/fa'
import { fetchTrains } from './redux/slices/trainSlice.js'



export const stationName = new Map();
export const prevStation = Array(10000);
export const nextStation = Array(10000);
export const isStation = Array(10000);

function App() {

  const trains = useSelector((state) => state.trains.items);
  const { colors, minCarCount, maxCarCount, serviceTypes, undefinedCarCount } = useSelector((state) => state.sort);

  const [filteredTrains, setFilteredTrains] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchTrains());
    }, 10000);

    const fetchRoutes = async () => {
      const { data } = await axios.get("https://api.wmata.com/TrainPositions/StandardRoutes?contentType=json");
      data.StandardRoutes.forEach((routeEl) => {
        const routeLength = routeEl.TrackCircuits.length;
        const sortedTrackCircuits = routeEl.TrackCircuits.sort((a, b) => routeEl.TrackNum === 1 ? (a.SeqNum - b.SeqNum) : (b.SeqNum - a.SeqNum));
        let lastStation = null;
        for (let i = 0; i < routeLength; ++i) {
          const currentCircuit = sortedTrackCircuits[i];
          if (currentCircuit.StationCode) {
            lastStation = currentCircuit.StationCode;
            isStation[currentCircuit.CircuitId] = currentCircuit.StationCode;
          }
          prevStation[currentCircuit.CircuitId] = lastStation;
        }
        lastStation = null;
        for (let i = routeLength - 1; i >= 0; --i) {
          const currentCircuit = sortedTrackCircuits[i];
          nextStation[currentCircuit.CircuitId] = lastStation;
          if (currentCircuit.StationCode) lastStation = currentCircuit.StationCode;
        }
      })
    }

    const fetchStationNames = async () => {
      const { data } = await axios.get("https://api.wmata.com/Rail.svc/json/jStations");
      data.Stations.forEach((el) => {
        stationName[el.Code] = el.Name;
      })
    }

    const fetchAll = async () => {
      await Promise.all([fetchRoutes(), fetchStationNames()]);
      dispatch(fetchTrains());
    }

    fetchAll();

    return () => clearInterval(interval);
  }, [dispatch])


  React.useEffect(() => {
    setFilteredTrains(trains.filter((obj) =>
      colors.includes(obj.LineCode) &&
      serviceTypes.includes(obj.ServiceType) &&
      (obj.CarCount ?
        (obj.CarCount >= minCarCount &&
          obj.CarCount <= maxCarCount)
        : undefinedCarCount)).sort((a, b) => b.LineCode ? 1 : -1))
  }, [trains, colors, minCarCount, maxCarCount, serviceTypes, undefinedCarCount])



  return (
    <div className="wrapper">
      <div className="container">
        <div className="header">
          <h1> <FaSubway className="header-logo" /> Train Positions</h1>
          <Sort />
        </div>
        <div className="content">
          {
            trains.length ?
              filteredTrains.length ?
                filteredTrains.map((obj) =>
                  <Card {...obj} key={obj.TrainId} />
                ) :
                <NotFound />
              : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <ReactLoading type={"cylon"} color={"black"} height={150} width={150} />
                </div>)
          }
        </div>
      </div>
    </div>
  );
}

export default App;
