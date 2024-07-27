"use client";
// (use client) is mandatory for spinner to spin

import MoonLoader from "react-spinners/MoonLoader";

// (override) - your custom styles for the spinner
const override = {
  display: 'block',
  margin: '200px auto'
}

const LoadingPage = ({ loading }) => {
  return (
    <MoonLoader
      color='#FF5700'
      loading={loading}
      cssOverride={override}
      size={100}
      aria-label="Loading Spinner"
    />
  )
}

export default LoadingPage;