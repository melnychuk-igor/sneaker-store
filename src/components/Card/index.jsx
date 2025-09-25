import plusImg from "@/assets/btn-plus.svg";
import checkedImg from "@/assets/btn-checked.svg";
import heartUnliked from "@/assets/heart.svg";
import styles from "./Card.module.scss";
import "macro-css";
import { useState } from "react";

function Card({ title, price, imageUrl, onFavorite, onPlus, onClick }) {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src={heartUnliked} alt="Unliked" />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Price:</span>
          <b>{price}$</b>
        </div>
        <img
          className={styles.plus}
          src={isAdded ? checkedImg : plusImg}
          alt="Plus"
          onClick={onClickPlus}
        />
      </div>
    </div>
  );
}

export default Card;
