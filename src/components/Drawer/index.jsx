// import { useState } from "react";
import btnRemoveImg from "@/assets/btn-remove.svg";
import arrowImg from "@/assets/arrow.svg";

function Drawer({ items = [], onClose }) {
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

        <div className="items">
          {items.map((obj) => (
            <div className="cartItem d-flex align-center">
              <div
                style={{ backgroundImage: `url(${obj.imageUrl})` }}
                className="cartItemImg"
              ></div>

              <div className="mr-20 flex">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price}</b>
              </div>
              <img className="removeBtn" src={btnRemoveImg} alt="Remove" />
            </div>
          ))}
        </div>

        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Total:</span>
              <div></div>
              <b>$239</b>
            </li>
            <li>
              <span>Tax 5%:</span>
              <div></div>
              <b>$12</b>
            </li>
          </ul>
          <button className="greenButton">
            Checkout <img src={arrowImg} alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
