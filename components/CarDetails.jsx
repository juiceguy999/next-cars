import BookmarkButton from "@/components/BookmarkButton";
import Image from "next/image";

const CarDetails = ({car, className=''}) => {
  return (
    <div className={`${className} text-light`}>
      <div className="flex items-center justify-between">
        <p className={`${car.condition.toLowerCase() === 'new' ? 'font-bold rounded-md text-sm py-1 px-2 bg-dark text-orange uppercase tracking-widest mb-4' : 'mb-1'}`}>{car.condition}</p>
        <BookmarkButton car={car} />
      </div>
      <h1 className="text-2xl font-bold mb-2">{car.name}</h1>
      <p className="text-base mb-4">{(car.mileage).toLocaleString('en-US')} km</p>
      <p className="text-3xl font-bold text-orange">${(car.price).toLocaleString('en-US')}</p>
      {car.rent && (<div>
        <p className="text-sm text-silverLightGray mt-2">or rent this car for...</p>
        <dl className="grid grid-cols-2 max-w-96 mt-2">
          {car.rates.daily && (<>
            <dt className="py-2 font-bold">Daily</dt>
            <dd className="py-2 text-orange font-semibold">${car.rates.daily.toLocaleString()}</dd>
          </>)}
          {car.rates.weekly && (<>
            <dt className="py-2 font-bold">Weekly</dt>
            <dd className="py-2 text-orange font-semibold">${car.rates.weekly.toLocaleString()}</dd>
          </>)}
          {car.rates.monthly && (<>
            <dt className="py-2 font-bold">Monthly</dt>
            <dd className="py-2 text-orange font-semibold">${car.rates.monthly.toLocaleString()}</dd>
          </>)}
        </dl>
      </div>)}
      <div className="mt-12">
        <h3 className="text-3xl font-bold mb-4">Basics</h3>
        <dl className="grid grid-cols-2">
          <dt className="py-2 font-bold border-b border-borderGray">Body style</dt>
          <dd className="py-2 border-b border-borderGray">{car.type}</dd>
          <dt className="py-2 font-bold border-b border-borderGray">Brand</dt>
          <dd className="py-2 border-b border-borderGray">{car.brand}</dd>
          <dt className="py-2 font-bold border-b border-borderGray">Color</dt>
          <dd className="py-2 border-b border-borderGray">{car.color}</dd>
          <dt className="py-2 font-bold border-b border-borderGray">Drivetrain</dt>
          <dd className="py-2 border-b border-borderGray">{car.drive}</dd>
          <dt className="py-2 font-bold border-b border-borderGray">Fuel type</dt>
          <dd className="py-2 border-b border-borderGray">{car.fuel}</dd>
          <dt className="py-2 font-bold border-b border-borderGray">Transmission</dt>
          <dd className="py-2 border-b border-borderGray">{car.transmission}</dd>
          <dt className="py-2 font-bold border-b border-borderGray">Engine power</dt>
          <dd className="py-2 border-b border-borderGray">{car.power} h.p.</dd>
          <dt className="py-2 font-bold border-b border-borderGray">Engine capacity</dt>
          <dd className="py-2 border-b border-borderGray">{(car.capacity / 1000).toFixed(1)} L</dd>
          <dt className="py-2 font-bold border-b border-borderGray">Year</dt>
          <dd className="py-2 border-b border-borderGray">{car.year}</dd>
          <dt className="py-2 font-bold border-b border-borderGray">Seats</dt>
          <dd className="py-2 border-b border-borderGray">{car.seats}</dd>
          <dt className="py-2 font-bold border-b border-borderGray">Condition</dt>
          <dd className="py-2 border-b border-borderGray">{car.condition}</dd>
          <dt className="py-2 font-bold border-b border-borderGray">Mileage</dt>
          <dd className="py-2 border-b border-borderGray">{(car.mileage).toLocaleString('en-US')} km</dd>
        </dl>
      </div>
      <div className="mt-12">
        <h3 className="text-3xl font-bold mb-4">Features</h3>
        <ul className="flex flex-wrap gap-2">
          {car.features.map((feature, index) => (
            <li className="bg-dark text-light border border-borderGray rounded-3xl py-2 px-3 text-sm" key={index}>{feature}</li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default CarDetails;