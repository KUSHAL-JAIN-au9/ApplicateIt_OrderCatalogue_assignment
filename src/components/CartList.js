import CartItem from "./CartItem";
import Button from "@material-ui/core/Button";
const CartList = ({ cartItems, handleAddItemToCart, handleRemoveItemFromCart,handleOrderItems  }) => {
  const calculeTotal = cartItems.reduce(
    (sum, i) => sum + i.amount * i.price,
    0
  );
  return (
    <aside>
      <h1>Cart</h1>
      <h2>Total: {calculeTotal.toFixed(2)}</h2>
      {cartItems.length === 0 ? <h3>No products yet...</h3> : null}
      <div>
        {cartItems.map((i) => (
          <CartItem item={i} handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart}
          handleOrderItems={handleOrderItems} />
        ))}
      </div>
      

    </aside>
  );
};
export default CartList;