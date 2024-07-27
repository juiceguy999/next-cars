'use client';
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const CarContactForm = ({car}) => {
  const {data: session} = useSession();
  const userId = session?.user?.id;

  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [bodyError, setBodyError] = useState('');
  const [phoneError, setPhoneError] = useState('');



  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!userId) {
      toast.info('Sign in to contact the owner')
      return;
    }

    let isValid = true;

    setEmailError('');
    setBodyError('');
    setPhoneError('');

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Enter valid email');
      isValid = false;
    }

    if (phone && !/^\d{4,15}$/.test(phone)) {
      setPhoneError('Phone number is invalid');
      isValid = false;
    }

    if (!body.trim()) {
      setBodyError('Please enter your message');
      isValid = false;
    }

    if(!isValid) { return }

    const messageData = {
      email,
      phone,
      body,
      recipient: car.owner,
      car: car._id
    };

    try {
      const res = await fetch(`/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      });

      if(res.status === 200) {
        toast.success('Message sent successfully');
        setSubmitted(true);
      } else if (res.status === 400 || res.status === 401) {
        const resData = await res.json();
        toast.error(resData.message)
      } else {
        toast.error('Error sending form')
      }

    } catch (error) {
      console.log(error);
      toast.error('Error sending form');
    } finally {
      setEmail('');
      setPhone('');
      setBody('');
    }

  }

  return (
    <div className="bg-dark text-light p-6 md:rounded-lg">
      <h3 className="text-lg text-orange font-bold mb-6 tracking-wider">Contact seller</h3>
      <p className="text-silverGray text-sm font-medium mb-4">Please fill out these fields, the phone number is optional</p>
      {submitted ? (
        <p className="text-green-500 font-bold mb-4">Success</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative group">
              <label className={`${email.length > 0 ? 'text-xs [transform:translate3d(1px,-10px,0)]' : ''} ${emailError ? 'text-[#f00] opacity-90' : 'text-silverGray'} group-focus-within:text-orange group-focus-within:text-xs group-focus-within:[transform:translate3d(1px,-10px,0)] transition-all absolute inline-block top-4 left-4 select-none whitespace-nowrap pointer-events-none  text-base`} htmlFor="email">
                Email
              </label>
              <input
                className={`${emailError ? 'border-[#E70000]' : 'border-borderGray'} bg-darkGray border focus:border-orange w-full p-4 pb-0 leading-tight h-14 rounded-xl focus:outline-none focus:shadow-outline`}
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength="35"
              />
              {emailError && <span className="block text-[#f00] opacity-90 mt-1 text-sm">{emailError}</span>}
            </div>
            <div className="relative group">
              <label className={`${phone.length > 0 ? 'text-xs [transform:translate3d(1px,-10px,0)]' : ''} ${phoneError ? 'text-[#f00] opacity-90' : 'text-silverGray'} group-focus-within:text-orange group-focus-within:text-xs group-focus-within:[transform:translate3d(1px,-10px,0)] transition-all absolute inline-block top-4 left-4 select-none whitespace-nowrap pointer-events-none  text-base`} htmlFor="phone">
                Phone
              </label>
              <input
                className={`${phoneError ? 'border-[#E70000]' : 'border-borderGray'} bg-darkGray border  focus:border-orange w-full p-4 pb-0 leading-tight h-14 rounded-xl focus:outline-none focus:shadow-outline`}
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {phoneError && <span className="block text-[#f00] opacity-90 mt-1 text-sm">{phoneError}</span>}
            </div>
          </div>
          <div className="mb-4 relative group">
            <label className={`${body.length > 0 ? 'text-xs [transform:translate3d(1px,-10px,0)]' : ''} ${bodyError ? 'text-[#f00] opacity-90' : 'text-silverGray'} group-focus-within:text-orange group-focus-within:text-xs group-focus-within:[transform:translate3d(1px,-10px,0)] transition-all absolute inline-block top-4 left-4 select-none whitespace-nowrap pointer-events-none  text-base`} htmlFor="body">
              Enter your message
            </label>
            <textarea
              className={`${bodyError ? 'border-[#E70000]' : 'border-borderGray'} placeholder:text-silverGray bg-darkGray border  focus:border-orange rounded-xl w-full p-4 pt-6 pb-0 h-44 resize-none focus:outline-none focus:shadow-outline`}
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              maxLength="300"
            ></textarea>
            {bodyError && <span className="block text-[#f00] opacity-90 text-sm">{bodyError}</span>}
          </div>
          <button
            className="bg-dark border border-borderGray hover:border-orange hover:text-orange text-light font-bold py-2 px-4 rounded-xl w-full focus:outline-none focus:shadow-outline mb-4"
            type="submit"
          >
            Send message
          </button>
          <p className="text-silverGray text-xs font-normal">Be aware that your name (Google account username) will be shown to the seller in personal messages. <br /> <br /> For more information, please check our <Link href="/policy" className="underline font-medium text-orange">privacy policy</Link>.</p>
        </form>
      )}
    </div>
  )
}

export default CarContactForm