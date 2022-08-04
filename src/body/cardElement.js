import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";

function ImageData({ data, loading, error, login, handleCart, admin }) {

  return (
    <>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error} & check the internet connection`}</div>
      )}
      <Container>
        <Row md={6} xs={1}>
          {data &&
            data.map(({ id, title, description, image }) => (
              <Col style={{ marginRight: "6rem" }} key={id}>
                <Card
                  style={{
                    width: "300px",
                    margin: "15px",
                    padding: "10px",
                    height: "400px",
                  }}
                >
                  <Card.Img
                    variant="top"
                    style={{ width: "4rem", margin: "auto" }}
                    src={image}
                  />
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description.slice(0, 40)}</Card.Text>
                    { !admin ? (
                      <>
                        <Link to={login ? "/detail" : "/"} state={{ id: id }}>
                      <Button variant="primary" className="mt-5">
                        Detail
                      </Button>{" "}
                    </Link>
                    <Button className="mt-5" variant="outline-primary" onClick={login ? () => handleCart(data[id - 1]) : ""}>
                        Add to cart
                      </Button>{" "}
                      </>
                    ) : (
                      <>
                        <Button>Stock {id * 2}</Button>
                      </>
                    )}
                    
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default ImageData;
