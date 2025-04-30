import LocationComponent from "@/components/LocationComponent";
import MenuComponent from "@/components/MenuComponent";

import { useState, useEffect } from "react";

interface LocationData {
  image: {
    results?: Array<{
      urls: {
        regular: string;
      };
    }>;
  };
  location: string;
}

export function Welcome() {
  // Getting coordiates function
  function successLocationMethod(pos: GeolocationPosition) {
    const { latitude, longitude } = pos.coords;
    setLocationCoords({
      latitude,
      longitude,
    });
  }
  function errorLocationMethod(err: GeolocationPositionError) {
    setLocationError({
      error: true,
      message: err.message,
      code: err.code,
    });
  }


  const [locationCoords, setLocationCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [locationError, setLocationError] = useState({
    error: false,
    message: "",
    code: 0,
  });

  const [locationData, setLocationData] = useState<LocationData>({
    image: {
      results: [],
    },
    location: "",
  });

  const [inputtedLocation, setInputtedLocation] = useState<string | null>(null);


  function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  // Set location coordinates and handle error if it arises 
  useEffect(() => {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(successLocationMethod,  errorLocationMethod)
    }
  }, []); 
  // Gather weather data from API via coords on inital render
  useEffect(() => {
    if(locationCoords.latitude !== 0 && locationCoords.longitude !== 0) {
      const fetchUrl = `https://weather-backend-6kka.onrender.com/lat=${locationCoords.latitude}&lon=${locationCoords.longitude}`;
      fetch(fetchUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setLocationData({
            image: data.image,
            location: data.weather,
          });
        })
    }
  }, [locationCoords, locationError]);

  useEffect(() => {
    const fetchUrl = `https://weather-backend-6kka.onrender.com/q=`;
    inputtedLocation && fetch(fetchUrl+ inputtedLocation)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setLocationData({
        image: data.image,
        location: data.weather,
      });
    })
  }, [inputtedLocation])

  const randomImage = locationData?.image?.results?.[randomNumber(1, 5)];

  return (
    <main className="h-screen w-screen flex justify-center items-center" style={{
      backgroundImage: `url("${randomImage?.urls?.regular}")`,
      backgroundSize: "cover",
      boxShadow:"inset 0 0 0 2000px rgba(0, 0, 0, 0.5)",}}
>
      <LocationComponent 
      locationInfo = {locationData.location}
      imageInfo = {randomImage}/>
      <MenuComponent 
      setInputtedLocation={setInputtedLocation}
      locationInfo = {locationData.location}/>  
    </main>
  );
}

