import "./app.scss"
import React from "react"
import axios from "./axios.js"
import Card from "./components/Card.jsx"
import Sort from './components/Sort.jsx'

function App() {

  const [trains, setTrains] = React.useState([]);

  React.useEffect(() => {
    // const interval = setInterval(() => {
    //   fetchData();
    // }, 10000);
    const fetchData = async () => {
      const { data } = await axios.get("https://api.wmata.com/TrainPositions/TrainPositions?contentType=json");

      setTrains(data.TrainPositions);
    }
    fetchData();
    // return () => clearInterval(interval);
  }, [])

  return (
    <div className="wrapper">
      <div className="container">
        <div className="header">
          <h1>Live Train Positions</h1>
          <Sort />
        </div>
        <div className="content">
          {
            trains.map((obj) =>
              <Card {...obj} />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
