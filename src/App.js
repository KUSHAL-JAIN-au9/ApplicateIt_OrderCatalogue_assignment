import { useState } from "react";
import { useQuery } from "react-query";
import {Switch, Route } from 'react-router-dom';
//Components
import Item from "./components/Item";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import "./custom.css";
import OrderItems from "./Pages/OrderItems";

import { useHistory } from "react-router";
const getProducts = async () =>
  await (await fetch("https://fakestoreapi.com/products/")).json();
const App = () => {
  const { isLoading, error, data } = useQuery("products", getProducts);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const history= useHistory()
  const getTotalItems = (cartItems) =>
    cartItems.reduce((acum, i) => acum + i.amount, 0);
  const handleAddItemToCart = (item) => {
    setCartItems((prev) => {
      // Search the item in the array
      const isItemInTheCart = prev.find((i) => i.id === item.id);
      if (isItemInTheCart) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, amount: i.amount + 1 } : i
        );
      }
      return [...prev, { ...item, amount: 1 }];
    });
  };
  const handleRemoveItemFromCart = (id) => {
    setCartItems((prev) => {
      const foundItem = prev.find((i) => i.id === id);
      if (foundItem) {
        if (foundItem.amount === 1) {
          const newArray = prev.filter((i) => i.id !== id);
          return newArray;
        } else {
          return prev.map((i) =>
            i.id === id ? { ...i, amount: i.amount - 1 } : i
          );
        }
      } else {
        return prev;
      }
    });
  };

  const handleOrderItems = (order) => {
    const {title,price,qty, total} = order

    setOrderItems(order)

    localStorage.setItem('orderItems', JSON.stringify(total))

    console.log(order)
    // console.log(history)
    history.push('/myorder')
    alert(`ordered item:  ${title}, price: ${price}, quantity:  ${qty}, Total amount: ${total}`)

  }
  if (isLoading) return <LinearProgress/>;
  if (error) return error.message;
  return (
    <>
      <Navbar
        getTotalItems={getTotalItems(cartItems)}
        setCartOpen={setCartOpen}
      ></Navbar>
    
      
      <div className="main">

        
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >

       
          <CartList
            cartItems={cartItems}
            handleAddItemToCart={handleAddItemToCart}
            handleRemoveItemFromCart={handleRemoveItemFromCart}
            handleOrderItems= {handleOrderItems}
          />
        </Drawer>

        <OrderItems orderItems={orderItems}/>
        <Grid container spacing={3}>
          {data?.map((item) => (
            <Grid key={item.id} item xs={12} sm={4}>
              <Item item={item} handleAddItemToCart={handleAddItemToCart} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};
export default App;