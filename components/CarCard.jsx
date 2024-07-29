import Image from 'next/image';
import Link from 'next/link';

const CarCard = ({car}) => {

  const getRatesDisplay = () => {
    const { rates } = car;

    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`
    } else if (rates.daily) {
      return `${rates.daily.toLocaleString()}/d`
    }
  }

  return (
    <Link href={`/cars/${car._id}`} className="group rounded-xl overflow-hidden relative bg-darkGray">
      <div className="relative overflow-hidden pb-[50%] select-none">
        <Image
          src={car.images[0]}
          alt=""
          className='w-full h-full object-cover group-hover:scale-105 transition-all duration-500'
          sizes='100%'
          fill
        />
        {car.rent && (<span className='absolute bottom-1 left-1 font-semibold rounded-md text-xs py-1 px-2 bg-dark text-light  tracking-wider' >RENT</span>)}
        {(car.condition.toLowerCase() === 'new') && (!car.rent) && (<span className='absolute bottom-1 left-1 font-semibold rounded-md text-xs py-1 px-2 bg-dark text-orange  tracking-widest' >NEW</span>)}
        {(car.condition.toLowerCase() === 'broken') && (!car.rent) && (<span className='absolute bottom-1 left-1 font-semibold rounded-md text-xs py-1 px-2 bg-dark text-[#f00]/90  tracking-widest' >BROKEN</span>)}
      </div>
      <div className="py-3 px-4 text-white">
        <h3 className="text-left text-lg font-semibold truncate">{car.name}</h3>
        <p className='mt-1 text-silverGray text-sm'>
          <span>{car.year}</span>
          <span className='opacity-50'> \ </span>
          <span>{(car.capacity / 1000).toFixed(1)} L</span>
          <span className='opacity-50'> \ </span>
          <span>{(car.mileage).toLocaleString('en-US')} km</span>
        </p>
        <div className="flex items-center justify-between">
          <p className='mt-2 text-2xl'>${(car.price).toLocaleString('en-US')}</p>
          <Image
            className="rounded-full self-end"
            src={car.owner.image}
            alt="user"
            width={24}
            height={24}
          />
        </div>
      </div>
    </Link>
  )
}

export default CarCard;