import { useState, useEffect } from "react";
import ImageData from "./cardElement";

function HomePages({login, handleCart, admin }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "https://fakestoreapi.com/products?limit=20";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return (
    <ImageData data={data} loading={loading} error={error} login={login} handleCart={handleCart} admin={admin} />
  )
}

export default HomePages;
