import CarCard from '@/components/CarCard';
import Link from 'next/link';
import { fetchCars } from '@/utils/requests';


const RecentCars = async () => {

  const data = await fetchCars();

  const recentCars = data.cars
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Recent Cars
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentCars.length === 0 ? (
            <p className='text-light'>No cars</p>
          ) : recentCars.map((car) => (
            <CarCard key={car._id} car={car}  />
          ))}
        </div>
      </div>
    </section>
  )
}

export default RecentCars;