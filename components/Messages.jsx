'use client';
import { useState, useEffect } from "react";
import MessageCard from "@/components/MessageCard";
import Spinner from "@/components/Spinner";


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/messages`);

        if(res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.log('Error fetching messages', error);
      } finally {
        setLoading(false);
      }
    })()
  }, []);


  return loading ? (<Spinner loading={loading} />) : (
    <section>
      <div className="container m-auto py-6 md:py-12 max-w-6xl">
        <div className="mb-4 shadow-md rounded-md">
          <h1 className="pl-2 text-2xl md:text-3xl font-semibold text-orange mb-6">Messages</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (<p className="text-light pl-3">You have no messages</p>) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Messages