import "./App.css";
import HomePages from "./body/homePage";
import NavHeader from "./header/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DetailPage from "./body/detail";
import CartPage from "./body/cart";
import RekapPage from "./body/rekap";
import { useState } from "react";
import NavAdmin from "./header/navAdmin";
import NavUser from "./header/navUser";

function App() {
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [cart, setCart] = useState(0);
  const [item, setItem] = useState([[]]);
  const [checkout, setCheckout] = useState(null);

  const login = (e) => {
    e.preventDefault();
    //console.log(email, password);
    const userData = {
      email,
      password,
      admin,
    };
    if (
      userData.email === "admin@bukapedia.com" &&
      userData.password === "admin123"
    ) {
      setAdmin(true);
    }
    window.localStorage.setItem("token-info", JSON.stringify(userData));
    setIsLoggedin(true);
    setEmail("");
    setPassword("");
  };

  const logout = () => {
    window.localStorage.removeItem("token-info");
  };

  const handleCart = (data) => {
    setCart(cart + 1);
    setItem(prevData => [...prevData, data] )
    //console.log(item);
  };

  const handleCheckout = (data) => {
    setCheckout(data);
    setCart(0)
    setTimeout(() => {
      console.log(checkout)
    }, 2000)
  };

  return (
    <Router>
      <div className="App">
        {isLoggedin && admin ? (
          <NavAdmin logout={logout} isLoggedin={isLoggedin} items={item} />
        ) : isLoggedin && !admin ? (
          <NavUser logout={logout} cart={cart} isLoggedin={isLoggedin} />
        ) : (
          <NavHeader
            login={login}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        )}
        <Routes>
          <Route path='/' exact element={<HomePages login={isLoggedin} handleCart={handleCart} />} />
          <Route path='/home' exact element={<HomePages login={isLoggedin} handleCart={handleCart} admin={admin} />} />
          <Route path="/detail" element={<DetailPage handleCart={handleCart} />} />
          <Route path="/cart" element={<CartPage items={item} handleCheckout={handleCheckout} isLoggedin={isLoggedin} />} />
          <Route path="/rekap" element={<RekapPage items={item} checkout={checkout} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
