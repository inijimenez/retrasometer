import React, { useState, useEffect } from "react";
import Select from "react-select";

import renfeApi from "../api/renfeApi";
import TrainList from './TrainList';

const Form = () => {
  const [stations, setStations] = useState([]);  
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      const stationList = await renfeApi.getStations();
      const sortedStations = stationList.sort((a, b) => a.DESCRIPCION.localeCompare(b.DESCRIPCION));
      setStations(sortedStations.map(station => ({ value: station.CÓDIGO, label: station.DESCRIPCION })));
    };

    fetchStations();
  }, []);

  const handleChangeOrigin = (selectedOption) => {
    setOrigin(selectedOption);
  };

  const handleChangeDestination = (selectedOption) => {
    setDestination(selectedOption);
  };

  const handleSubmit = async (e) => {
     e.preventDefault();

    try {
      if (origin && destination) {
        console.log("TEST a: Origin:", origin.value, "Destination:", destination.value);
        const response = await renfeApi.getTrains(origin.value, destination.value);
        console.log("FIN:" + response.peticion.descEstOrigen + " - "+ response.peticion.descEstDestino);
        setTrains(response.horario);
          
      }
  
    } catch (error) {
      console.log("Error:" + error);
      console.error(error);
    }    
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label>
        Estación de origen:
        <Select
          value={origin}
          onChange={handleChangeOrigin}
          options={stations}
          isClearable
        />
      </label>
      <label>
        Estación de destino:
        <Select
          value={destination}
          onChange={handleChangeDestination}
          options={stations}
          isClearable
        />
      </label>
      <button type="submit">Buscar</button>
    </form>
    <TrainList trains={trains} />
    </div>
  );
};

export default Form;