import { useContext, useState } from "react";
import axios from "axios";

import Info from "@/components/Info";

import styles from "./Drawer.module.scss";

import btnRemoveImg from "@/assets/btn-remove.svg";
import arrowImg from "@/assets/arrow.svg";
import emptyCartImg from "@/assets/empty-cart.jpg";
import completeOrderImg from "@/assets/complete-order.jpg";

import { AppContext } from "../../App";
import { useCart } from "../../hooks/useCart";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ items = [], onClose, onRemove }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://68fd007896f6ff19b9f6f38d.mockapi.io/order",
        { items: cartItems }
      );
      console.log(data);
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://68cfd717ec1a5ff33825ad56.mockapi.io/cart/" + item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Cart{" "}
          <img
            onClick={onClose}
            className="cu-p"
            src={btnRemoveImg}
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  className="cartItem d-flex align-center"
                  key={obj.customId}
                  data-key={obj.customId}
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price}$</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.customId)}
                    className="removeBtn"
                    src={btnRemoveImg}
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Order Completed!" : "Cart is Empty"}
            description={
              isOrderComplete
                ? `Your order #${orderId} will soon be handed over to the courier service`
                : "Add at least one pair of sneakers to place an order."
            }
            image={isOrderComplete ? completeOrderImg : emptyCartImg}
          />
        )}

        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Total:</span>
              <div></div>
              <b>{totalPrice}$</b>
            </li>
            <li>
              <span>Tax 5%:</span>
              <div></div>
              <b>{((totalPrice / 100) * 5).toFixed(2)}$</b>
            </li>
          </ul>
          <button
            disabled={isLoading}
            onClick={onClickOrder}
            className="greenButton"
          >
            Checkout <img src={arrowImg} alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
