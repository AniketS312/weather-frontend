export default function LocationComponent({locationInfo, imageInfo}: {locationInfo: any, imageInfo: any}) {
  function capitalizeFirstLetter(str: string): string {
    if (!str) return ""; // Handle empty or undefined strings
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function convertFromKelvinToCelsius(kelvin: number): number {
    if (kelvin < 0) return 0; // Handle negative temperatures
    return Math.round(kelvin - 273.15);
  }

  return (
    <section className='h-full grow-3 flex'>
      <div className='flex flex-col grow pt-5 pl-5'> 
        <h2 className='text-2xl'>Image by <a
            href={imageInfo?.links?.html}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline"
          >{imageInfo?.user?.name}</a>
        </h2>
      </div>
      <div className='flex flex-col justify-end items-end pb-10 pr-20 grow text-white'>
        <div className='flex'>
          <span className='self-start'>
            <img className='w-[80%]' src={`https://openweathermap.org/img/wn/${locationInfo?.weather?.[0]?.icon}.png`}/>
          </span>
          <h1 className='text-5xl'>{locationInfo.name}</h1>
        </div>
        <h2 className='text-2xl'>{capitalizeFirstLetter(locationInfo?.weather?.[0].description)}: {convertFromKelvinToCelsius(locationInfo?.main?.feels_like)}&deg; C</h2>
      </div>    
    </section>
  )
}