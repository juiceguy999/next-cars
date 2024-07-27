 'use client';
 import { useState, useEffect } from "react";

 const MessageCount = ({ session }) => {
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    if(!session) return;

    (async () => {
      try {
        const res = await fetch(`/api/messages/count`);

        if(res.ok) {
          const data = await res.json();
          setMessageCount(data);
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [session])

  if(!messageCount) {return null};

   return (
    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-orange rounded-full">
      {messageCount}
    </span>
   )
 }
 
 export default MessageCount