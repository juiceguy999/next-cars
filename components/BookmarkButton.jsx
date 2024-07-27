'use client';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import HeartIcon from "@/components/icons/HeartIcon";

const BookmarkButton = ({car}) => {
  const {data: session} = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if(!userId) return;

    (async () => {
      try {
        const res = await fetch('/api/bookmarks/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            carId: car._id
          })
        });
  
        if(res.ok) {
          const data = await res.json();
          setIsBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [car._id, userId]);

  const handleClick = async () => {
    if(!userId) {
      toast.error('Please Sign in!');
      return;
    }

    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          carId: car._id
        })
      });

      if(res.ok) {
        const data = await res.json();
        setIsBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button onClick={handleClick} className={`bg-dark hover:bg-backgroundGray transition-all  p-3 rounded-full flex items-center justify-center`}>
      <HeartIcon className={`${isBookmarked ? 'fill-orange stroke-orange' : 'stroke-silverLightGray'} w-6 h-6`} />
    </button>
  )
}

export default BookmarkButton