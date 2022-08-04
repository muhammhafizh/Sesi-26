import React from 'react'
import { useLocation } from "react-router-dom";

function RekapPage() {
  const location = useLocation();
  const { items } = location.state;

  console.log(items)
  // setTimeout(() => {
  //   console.log(checkout)
  //   console.log(items)
  // }, 2000)

  return (
    <div>RekapPage</div>
  )
}

export default RekapPage