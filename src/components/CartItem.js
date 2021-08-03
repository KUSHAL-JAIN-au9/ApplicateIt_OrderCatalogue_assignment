import Button from "@material-ui/core/Button";
const CartItem = ({ item, handleAddItemToCart, handleRemoveItemFromCart,handleOrderItems }) => {
  return (
    <aside>
      <div className="itemCart">
        <div>
          <h3>{item.title}</h3>
          <div className="itemInfo" mb={2}>
            <p>Precio: ${item.price}</p>
            <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
          </div>
          <div className="buttons">
            <Button onClick={ () => handleRemoveItemFromCart(item.id)} size="small" disableElevation variant="contained">
              -
            </Button>
            <p> {item.amount} </p>
            <Button
              size="small"
              disableElevation
              variant="contained"
              onClick={() => handleAddItemToCart(item)}
            >
              +
            </Button>
          </div>
        </div>
        <img src={item.image} alt={item.title} />
      </div>

      <Button size="medium" className="checkout"  color="secondary" onClick = { () => handleOrderItems({title:item.title,
    price:item.price,
    qty:item.amount, 
    image:item.image,
    total:(item.amount * item.price).toFixed(2)
    })}
    fullWidth="true"
    mt={3}
    style={{
        backgroundColor: "green",
        color: "white",
        marginTop:"100px"
    }}>
          Checkout
      </Button>
    </aside>
  );
};
export default CartItem;