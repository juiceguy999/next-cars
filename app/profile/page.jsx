'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import profileDefault from '@/assets/images/profile.png';
import Spinner from "@/components/Spinner";

import CarListing from "@/components/CarListing";
import MessageIcon from "@/components/icons/MessageIcon";

const ProfilePage = () => {

  const {data: session} = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCars = async (userId) => {
      if(!userId) return;

      try {
        const res = await fetch(`/api/cars/user/${userId}`);
        
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
        <h1 className="text-orange text-3xl font-bold mb-10 hidden md:block">Profile</h1>
          <div className="mx-auto flex flex-col items-center gap-6 px-3 py-3 md:px-6 md:py-6 rounded-none md:rounded-lg bg-dark">
            <Image
              className="h-32 w-32 md:h-32 md:w-32 rounded-full -mt-14"
              src={profileImage || profileDefault}
              width={200}
              height={200}
              alt="avatar"
            />
            <p className="md:text-2xl text-xl text-light font-medium">{profileName}</p>
            <p className="md:text-2xl text-base text-orange font-medium flex gap-1 md:gap-2 items-center w-full justify-center truncate"><MessageIcon className="w-5 h-5 md:w-8 md:h-8 stroke-orange flex-shrink-0" /><span className="truncate">{profileEmail}</span></p>
          </div>

          <div className="mt-10 px-4">
            <h2 className="text-2xl md:text-3xl text-light font-semibold mb-6">Car Listings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cars.length === 0 ? (
              <p>You don't have any added cars</p>
            ) : (
              cars.map((car) => (<CarListing key={car._id} car={car} onDelete={handleDelete} />))
            )}
            </div>
          </div>
      </div>
    </section>
  )
}

export default ProfilePage