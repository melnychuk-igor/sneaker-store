import { useContext  } from "react";
import { Link } from 'react-router-dom';

import "macro-css";

import logoImg from "@/assets/logo.png";
import heartImg from "@/assets/heart.svg";
import cartImg from "@/assets/cart.svg";
import userImg from "@/assets/user.svg";

import {AppContext} from '../App';

function Header({ onClickCart }) {
  const { cartItems } = useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
      <div className="d-flex align-center">
        <img width={40} height={40} src={logoImg} alt="Logotype" />
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">The best sneakers store</p>
        </div>
      </div>
      </Link>
      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src={cartImg} alt="Cart" />
          <span>{totalPrice}$</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={18} height={18} src={heartImg} alt="Favorites" />
          </Link>
        </li>
        <li>
          <img width={18} height={18} src={userImg} alt="User" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
