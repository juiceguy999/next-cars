'use client';
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import CrossIcon from "@/components/icons/CrossIcon";
import MessageIcon from "@/components/icons/MessageIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";

const MessageCard = ({message}) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  if(isDeleted) {return null};

  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT'
      });

      if(res.ok) {
        const {read} = await res.json();
        setIsRead(read);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong')
    }

  }

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE'
      });

      if(res.ok) {
        toast.success('Message Deleted');
        setIsDeleted(true);
      }
    } catch (error) {
      console.log(error);
      toast.error('Message was not deleted')
    }
  }



  return (
    <div className="relative bg-darkGray text-light p-3 md:p-4 rounded-none md:rounded-md">
      <div className="flex justify-between items-start">
        <div className={`${isRead ? 'bg-silverGray opacity-50' : 'bg-orange'} rounded-full w-4 h-4`}></div>
        <button onClick={handleDeleteClick} className="bg-dark hover:bg-[#1a1a1a] border border-borderGray font-semibold p-1 rounded-md">
          <CrossIcon className="fill-orange w-6 h-6" />  
        </button>
      </div>
      <h2 className="text-sm text-silverLightGray font-medium mb-4 flex gap-2 items-center">
        <Image
          className="rounded-full opacity-80"
          src={message.sender.image}
          alt="user"
          width={24}
          height={24}
        />
        <span>{message.sender.username}</span>
      </h2>
      <p>
        {message.body}
      </p>

      <div className="flex items-end justify-between mt-6">
        <div>
          <ul>
            <li className="flex gap-1 items-center w-full">
              <MessageIcon className="stroke-orange w-4 h-4" />
              <Link href={`mailto:${message.email}`} className="text-orange opacity-95 text-sm md:text-base truncate"
                >{message.email}</Link>
            </li>
            {message.phone && (<li className="flex gap-1 items-center mt-2">
              <PhoneIcon className="w-4 h-4 stroke-orange" />
              <Link href={`tel:${message.phone}`} className="text-orange opacity-95 text-sm md:text-base"
                >{message.phone}</Link>
            </li>)}
          </ul>
          <button
            onClick={handleReadClick} className="mt-4 text-sm bg-dark hover:bg-[#1a1a1a] border border-borderGray text-light font-semibold py-1 px-3 rounded-md">
            {isRead ? 'Mark as new' : 'Mark as read'}
          </button>
        </div>
        <div className="absolute bottom-3 right-3 md:static">
          <Link href={`/cars/${message.car._id}`} className="relative block overflow-hidden md:w-32 md:h-24 w-16 h-12 rounded-lg">
            <div className="absolute w-full h-full bg-[rgba(0,0,0,0.3)] hover:bg-transparent z-[1]"></div>
            <Image
              src={message.car.images[0]}
              alt=""
              className='w-full h-full object-cover'
              sizes='100%'
              fill
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MessageCard