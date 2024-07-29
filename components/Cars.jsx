'use client';
import { useState, useEffect } from "react";
import CarCard from "@/components/CarCard";
import Spinner from "@/components/Spinner";
import Pagination from "@/components/Pagination";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/cars?page=${page}&pageSize=${pageSize}`);

        if(!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        setCars(data.cars);
        setTotalItems(data.total);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    })()
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  return loading ? (<Spinner loading={loading} />) : (
    <section className="px-4 py-6 min-h-[calc(100vh-81px)] flex flex-col justify-between gap-6">
      <div className="container mx-auto">
        {cars.length === 0 ? (
          <p className='text-light'>No cars found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cars.map((car)=>(
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </div>
      <Pagination page={page} pageSize={pageSize} totalItems={totalItems} onPageChange={handlePageChange} />
    </section>
  )
}

export default Cars