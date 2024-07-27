'use client';
import { useState, useEffect } from "react";
import CarCard from "@/components/CarCard";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const FavoritesPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/bookmarks`);

        if(res.ok) {
          const data = await res.json();
          setCars(data);
        } else {
          console.log(res.statusText);
          toast.error('Failed to fetch favorites');
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch favorites');
      } finally {
        setLoading(false);
      }
    })();
  }, [])


  return loading ? (<Spinner loading={loading} />) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="pl-2 text-2xl md:text-3xl font-semibold text-orange mb-6">Favorite cars</h1>
        {cars.length === 0 ? (
          <p className="text-light">You don't have favorite cars. <br /> <br /> Click the heart button on the listing page to add it to favorites.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cars.map((car)=>(
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FavoritesPage