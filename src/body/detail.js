import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";

function DetailPage({handleCart}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { id } = location.state;
  //console.log(id);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
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
  }, [id]);

  //console.log(data);
  //console.log(data.image)
  return (
    <>
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      {loading ? (
        <div>A moment please...</div>
      ) : (
        <>
        <Container className="mt-5">
        <Card className="bg-dark text-white">
          <Card.Img src={data.image} alt="Card image" style={{ width: 300 }} />
          <Card.ImgOverlay style={{ marginLeft: 300 }}>
            <Card.Title style={{ marginBottom: 50 }}>{data.title}</Card.Title>
            <Card.Text>{data.description}</Card.Text>
            <Card.Text>{data.category}</Card.Text>
            <Button variant="primary">$ {data.price}</Button>{" "}
            <Button variant="outline-primary" onClick={() => handleCart(data.id)}>Add to cart</Button>{" "}
          </Card.ImgOverlay>
        </Card>
        </Container>
        </>
      )}
    </>
  );
}

export default DetailPage;
