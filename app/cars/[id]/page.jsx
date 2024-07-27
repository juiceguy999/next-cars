'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchCar } from "@/utils/requests";
import CarDetails from "@/components/CarDetails";
import Spinner from "@/components/Spinner";
import CarContactForm from "@/components/CarContactForm";
import CarGallery from "@/components/CarGallery";
import CarSellerInfo from "@/components/CarSellerInfo";

const CarPage = () => {

  const {id} = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {

      if(!id) return;
      if(car !== null) return;

      try {
        const car = await fetchCar(id);
        setCar(car);
      } catch(error) {
        console.error('Error fetching car:', error);
      } finally {
        setLoading(false);
      }

    })();
  }, [id, car]);

  if(!loading && !car){
    return (
      <h1 className="text-center text-2xl font-bold mt-10">Car not found</h1>
    )
  }

  return <>
    {loading && <Spinner loading={loading} />}
    {!loading && car && (<>
      <section>
        <div className="m-auto md:py-10 md:px-6 grid grid-cols-1 gap-8 lg:grid-cols-57/40 lg:gap-[3%] max-w-7xl">
          
          <div>
            <CarGallery images={car.images} isPublished={car.published} />

            <CarDetails car={car} className='mt-4 px-3 md:px-0' />
          </div>

          <div className="flex flex-col-reverse md:flex-col gap-8">
            <CarContactForm car={car} />
            <CarSellerInfo car={car} />
          </div>
        </div>
      </section>
    </>)}
  </>
}

export default CarPage