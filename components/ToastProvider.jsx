"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { cssTransition } from 'react-toastify';


const swirl = cssTransition({
  enter: "slide-in-blurred-top",
  exit: "slide-out-blurred-top"
});


export default function ToastProvider({ children }) {

  return (
    <>
      {children}
      <ToastContainer theme='dark' hideProgressBar={true} pauseOnFocusLoss={false} pauseOnHover={false} limit={1} style={{'--toastify-icon-color-info': '#FF5700', '--toastify-color-dark': '#050505'}} toastClassName='font-medium'  transition={swirl} />
    </>
  );
}