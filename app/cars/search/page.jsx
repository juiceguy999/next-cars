'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CarCard from "@/components/CarCard";
import Spinner from "@/components/Spinner";
import CarSearchForm from "@/components/CarSearchForm";


const SearchPage = () => {
  const searchParams = useSearchParams();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get('search');
  const brand = searchParams.get('brand');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/cars/search?search=${search}&brand=${brand}`);

        if(res.ok) {
          const data = await res.json();
          setCars(data);
        } else {
          setCars([]);
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    })()
  }, [search, brand]);

  return (<>
    <section className="bg-orange-500 py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
        <CarSearchForm />
      </div>
    </section>
    { loading ? (<Spinner loading={loading} />) : (
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {cars.length === 0 ? (
            <p>No cars found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cars.map((car)=>(
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}
        </div>
      </section>
    )}
  </>)
}

export default SearchPage