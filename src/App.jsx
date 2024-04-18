import { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./Footer";
import { GuitarItem } from "./components/GuitarItem";
import { Header } from "./components/Header";
import { db } from './data/db'

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 10;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])

  function addToCart (item) {
    const itemExist = cart.findIndex(guitar => guitar.id === item.id);
   

      if(itemExist >= 0){
        if(cart[itemExist].quantity >= MAX_ITEMS) return;
        const updatedCart = [...cart]
        updatedCart[itemExist].quantity++
        setCart(updatedCart);
      } else {
        item.quantity=1;
        setCart([...cart, item]);
      }
  }

  function removeFromCart (id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
  }

  function increaseQuantity (id) {
    console.log('Incrementando', id);
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart);
  }

  function decreaseQuantity (id) {
    console.log('Decrementando', id);
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity -1
        }
      }
      return item;
    })
    setCart(updatedCart);
  }

  function clearCart () {
    setCart([]);
  }


  return (
    <>
      <Header cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} clearCart={clearCart} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          { data.map((guitar) =>(
            <GuitarItem key={guitar.id} guitar={guitar} addToCart={addToCart}/>
          ) )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
