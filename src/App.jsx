import "./App.css";
import { Footer } from "./Footer";
import { GuitarItem } from "./components/GuitarItem";
import { Header } from "./components/Header";
import { useCart } from "./hooks/useCart";

function App() {


  const { data, cart, isEmpty, cartTotal, removeFromCart, addToCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  

  return (
    <>
      <Header cart={cart} isEmpty={isEmpty} cartTotal={cartTotal} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} clearCart={clearCart} />
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
