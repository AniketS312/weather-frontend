import {useFetcher } from "react-router";

type MenuComponentProps = {
  setInputtedLocation: React.Dispatch<React.SetStateAction<string | null>>;
  locationInfo?: {
    wind?: {
      speed: number;
    };
    sys?: {
      country?:string;
      sunrise?: number;
      sunset?: number;
    }
  }
}

interface CityInfoProps {
  windSpeed: number;
  sunrise: Date;
  sunset: Date;
  country: string;
}

export default function MenuComponent({ setInputtedLocation, locationInfo }: MenuComponentProps) {
  console.log(locationInfo)

 return( 
  <section className='h-full w-20 gap-10 flex flex-col justify-start items-start px-4 pt-10 isolate aspect-video w-96 rounded-l-xl bg-black/40 shadow-lg ring-1 ring-black/5 text-white'>
      <SearchForm 
        setInputtedLocation={setInputtedLocation} />
      <ListOfCities 
      setInputtedLocation={setInputtedLocation}
      />
      <CityInfo 
        windSpeed={locationInfo?.wind?.speed || 0} 
        sunrise={new Date(locationInfo?.sys?.sunrise || 0)} 
        sunset={new Date(locationInfo?.sys?.sunset || 0)} 
        country={locationInfo?.sys?.country || ""}
      />
    </section>
 )
}

function SearchForm({setInputtedLocation}: {setInputtedLocation: React.Dispatch<React.SetStateAction<string | null>>}) {
    let fetcher = useFetcher();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); 
    const formData = new FormData(event.currentTarget); 
    const city = formData.get("city") as string;    
    // console.log(city);
    setInputtedLocation(city); 
  }
  return (
    <fetcher.Form method="get" onSubmit={handleSubmit} className="w-full grow-1 flex justify-center items-center ">
      <input type="text" name="city" placeholder="Search..." className="border-y-2 border-l-2 outline-none border-white rounded-l-md p-2 " />
      <button className='bg-amber-500 h-11 w-10  flex justify-center items-center cursor-pointer border-y-2 border-r-2 border-white'><SearchIcon/></button>
    </fetcher.Form>
  )
}


function ListOfCities({setInputtedLocation}: {setInputtedLocation: React.Dispatch<React.SetStateAction<string | null>>}) {
  const cities = ['London', 'New York', 'Tokyo', 'Paris', 'Amsterdam'];

  const handleCitiesSubmit = (city: string) => {
    setInputtedLocation(city);
  }

  return (
    <section>
      <ul className='grow-3 flex flex-col gap-4 pl-5'>
       {cities.map((city, index) => (
          <li key={index} className='text-2xl list-none cursor-pointer hover:font-medium'>
            <button className='cursor-pointer hover:font-medium' onClick={() => handleCitiesSubmit(cities[index])}>
              {city}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

const CityInfo: React.FC<CityInfoProps> = ({ windSpeed, sunrise, sunset, country }) => {
  return(
    <section className='w-full pl-5 grow-2 flex flex-col justify-center items-start gap-2'>
      <p className='text-xl'>Country Code: {country}</p>
      <p className='text-xl'>Sunrise: {sunrise.toLocaleString().split(',')[1]}</p>
      <p className='text-xl'>Sunset:  {sunset.toLocaleString().split(',')[1]}</p>
      <p className='text-xl'>Wind Speed: {windSpeed} m/h</p>
    </section>
  )
}

function SearchIcon(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
      <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
    </svg>
  )
}