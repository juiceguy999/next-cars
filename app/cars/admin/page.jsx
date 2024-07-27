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
      <div className="text-light container m-auto py-20 md:py-12 max-w-6xl">
        <h1 className="text-orange text-3xl font-bold mb-10 hidden md:block">Admin Dashboard</h1>
          <div className="mt-10 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cars.length === 0 ? (
              <p>No added cars</p>
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