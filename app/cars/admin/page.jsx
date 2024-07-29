'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Spinner from "@/components/Spinner";
import CarAdminListing from "@/components/CarAdminListing";

const CarsAdminPage = () => {

  const {data: session} = useSession();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCars = async (userId) => {
      if(!userId) return;
      if(!session.user.admin) return;

      try {
        const res = await fetch(`/api/cars/admin`);
        
        if(res.ok) {
          const data = await res.json();
          setCars(data);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    
    if(session?.user?.id) {
      fetchUserCars(session?.user?.id)
    }
  }, [session]);

  const handleDelete = async (carId) => {
    const updatedCars = cars.filter((car) => car._id !== carId); 
    setCars(updatedCars); 
  }

  return loading ? (<Spinner loading={loading}/>) : (
    <section>
      <div className="text-light container m-auto py-6 md:py-12 max-w-6xl">
        <h1 className="text-orange/100 text-2xl md:text-3xl font-bold mb-6 md:mb-10 pl-4">Moderation Dashboard</h1>
          <div className=" px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cars.length === 0 ? (
              <p className="py-3 pl-3 px-4 rounded-lg bg-dark w-fit text-[18px] font-semibold text-silverGray">There are no cars for approval.</p>
            ) : (
              cars.map((car) => (<CarAdminListing key={car._id} car={car} onDelete={handleDelete} />))
            )}
            </div>
          </div>
      </div>
    </section>
  )
}

export default CarsAdminPage