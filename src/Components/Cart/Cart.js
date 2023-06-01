import React, { useCallback, useContext, useState } from "react";

import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/cart-context";
import CartItem from "./CartItem";
import Order from "../OrderForm/Order";
import useRequest from "../../Hooks/useRequest";

export default function Cart(props) {
  const [ordering, setOrdering] = useState(false);
  const [orderIsFinished, setOrderIsFinished] = useState(false);
  const cartContext = useContext(CartContext);
  const {
    isLoading,
    orderHasError,
    sendRequest: sendOrderRequest,
  } = useRequest();

  const totalAmount = `${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setOrdering(true);
  };

  const cancelOrder = () => {
    setOrdering(false);
  };

  const sendOrder = useCallback((order) => {
    const putOrder = (order) => {
      const id = order.id;
      const name = order.name;
      const email = order.email;
      const totalAmount = order.totalAmount;
      const address = order.address;
      const city = order.city;
      const time = order.time;

      return {
        id,
        name,
        email,
        totalAmount,
        time,
        address,
        city,
      };
    };

    const registeredOrder = putOrder(order);

    sendOrderRequest(
      {
        url: "https://react-course-c6f1b-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
        method: "POST",
        body: registeredOrder,
        headers: { "Content-Type": "application/jsonw" },
      }
      // putOrder.bind(null, order)
    );

    setOrderIsFinished(true);
    // props.onCartClose();
    cartContext.resetCart();
  }, []);

  const closeCartAfterOrder = () => {
    setOrdering(false);
    setOrderIsFinished(false);
    props.onCartClose();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            item={item}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        );
      })}
    </ul>
  );

  return (
    <>
      {!ordering && (
        <Modal onClick={props.onCartClose}>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={props.onCartClose}
            >
              Close
            </button>
            {hasItems && (
              <button className={classes.button} onClick={orderHandler}>
                Order
              </button>
            )}
          </div>
        </Modal>
      )}
      {ordering && !orderIsFinished && (
        <Modal>
          <Order
            onSend={sendOrder}
            onCancel={cancelOrder}
            totalAmount={totalAmount}
          />
        </Modal>
      )}
      {ordering && orderIsFinished && (
        <Modal>
          <p className={classes.thankYou}>Thank you for ordering!</p>
          <div className={classes.actions}>
            <button className={classes.button} onClick={closeCartAfterOrder}>
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
