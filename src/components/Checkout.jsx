import { act, useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./Input";
import Button from "./UI/Button";
import UserProgressContext from "../util/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import { useActionState } from "react";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
const Checkout = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );
  const {
    data,
   
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);
  function handleClose() {
    userProgressCtx.hideCheckout();
  }
  function handleFinish(){
      userProgressCtx.hideCheckout();
      cartCtx.clearCart()
      clearData()
  } 
  async function checkOutAction(prevState,fd) {
    const customerData = Object.fromEntries(fd.entries());
    await sendRequest({
      order: {
        items: cartCtx.items,
        customer: customerData,
      },
    });
  }
  const [formState,formAction,pending]=useActionState(checkOutAction,null)
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button type="submit">Submit Order</Button>
    </>
  );
  if(pending)
  {
    actions=<span>Sending order data...</span>
  }
  if(data && !error)
  {
    return <Modal open={userProgressCtx.progress === "checkout"} onClose={handleFinish} >
      <h2>Success!</h2>
      <p>Your order was submitted successfully</p>
      <p>We will get back to you with more details via email within next few minutes</p>
      <p className="modal-actions">
        <Button type='button' onClick={handleFinish}>
          Okay
        </Button>
      </p>
    </Modal>
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action={formAction} >
        <h2>Checkout</h2>
        <p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title='Failed to submit order' message={error}/>}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};
export default Checkout;
