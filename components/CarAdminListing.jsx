import Image from 'next/image';
import Link from 'next/link';
import { toast } from "react-toastify";

const CarAdminListing = ({car, onDelete}) => {

  const handleDeleteCar = async (carId) => {
    try {
      const res = await fetch(`/api/cars/admin/${carId}`, {
        method: 'DELETE'
      });

      if(res.ok) {
        onDelete(carId);
        toast.info('Car listing deleted');
      }

    } catch(error) {
      console.log(error);
      toast.info('Failed to delete');
    }
  }

  const handlePublishCar = async (carId) => {
    try {
      const res = await fetch(`/api/cars/admin/${carId}`, {
        method: 'PUT'
      });

      if(res.ok) {
        onDelete(carId);
        toast.info('Car listing published');
      }

    } catch(error) {
      console.log(error);
      toast.info('Failed to publish');
    }
  }


  return (
    <div className="shadow-md rounded-xl overflow-hidden relative bg-darkGray">
      <Link href={`/cars/${car._id}`} className="relative overflow-hidden pb-[50%] block">
        <Image
          src={car.images[0]}
          alt=""
          className='w-full h-full object-cover'
          sizes='100%'
          fill
        />
      </Link>
      <div className="py-3 px-4 text-white">
        <h3 className="text-left text-lg font-semibold truncate">{car.name}</h3>
        <div className="flex gap-4 items-center mt-4">
          <button onClick={() => handlePublishCar(car._id)} className="bg-dark border text-[#0f0] border-borderGray rounded-lg px-3 py-2">Publish</button>
          <button onClick={() => handleDeleteCar(car._id)} className="bg-dark border text-[#f00] border-borderGray rounded-lg px-3 py-2">Delete</button>
        </div>
      </div>
    </div>
  )
}

export default CarAdminListing;