import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function CartPage({items, isLoggedin, handleCheckout }) {
  const allItemsCart = items.slice(1, items.length)
  //console.log(allItemsCart.map(({id, title, price, description, category}) => id ))
  const totalPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(allItemsCart.map(carts => carts.price).reduce((acc, amount) => acc + amount)) //total price items buy
  const priceItem = allItemsCart.reduce((a, {id, price}) => (a[id] = (a[id] || 0) + +price, a), {}); //total price per item in same id
  const removeDupliactes = allItemsCart.filter((arr, index, self) => index === self.findIndex((t) => (t.id === arr.id && t.title === arr.title))) //remove same item to display

  return (
    <>
      <Container className="mb-5 mt-3">
      { removeDupliactes && removeDupliactes.map(({id, title, price, image, category}) =>  (
        <>
          <Card className="bg-dark text-white" key={id}>
            <Card.Img src={image} alt="Card image" style={{ width: 200 }} />
            <Card.ImgOverlay style={{ marginLeft: 300 }}>
              <Card.Title style={{ marginBottom: 50 }}>{title}</Card.Title>
              <Card.Text>Category: {category}</Card.Text>
              <Card.Text>Total Items Buy : {priceItem[id] / price}</Card.Text>
              <Button variant="primary">Total Items Price: $ {priceItem[id]}</Button>{" "}
            </Card.ImgOverlay>
          </Card>
        </>        
        ))
      }</Container>
      <Container>
        <Button variant="outline-success me-4 mb-5">Total Price all items : {totalPrice}</Button>
        <Link
              to={isLoggedin ? "/home" : "/"}
              style={{ textDecoration: "none" }}
            >
              <a href="/home">
                <Button variant="success" className="mb-5" onClick={() => handleCheckout(removeDupliactes)}>Checkout Items</Button>
              </a>
            </Link>
      </Container>
    </>
  )
}

export default CartPage