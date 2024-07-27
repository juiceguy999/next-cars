"use client";
// (use client) is mandatory for spinner to spin

import MoonLoader from "react-spinners/MoonLoader";

// (override) - your custom styles for the spinner


const Spinner = ({ loading, size = 100, override = {display: 'block', margin: '200px auto'} }) => {
  return (
    <MoonLoader
      color='#FF5700'
      loading={loading}
      cssOverride={override}
      size={size}
      aria-label="Loading Spinner"
    />
  )
}

export default Spinner;