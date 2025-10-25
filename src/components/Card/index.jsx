import { useState, useContext  } from "react";
import ContentLoader from "react-content-loader";

import styles from "./Card.module.scss";
import "macro-css";

import plusImg from "@/assets/btn-plus.svg";
import checkedImg from "@/assets/btn-checked.svg";
import heartLiked from "@/assets/heart-liked.svg";
import heartUnliked from "@/assets/heart.svg";

import {AppContext} from '../../App';

function Card({
  id,
  customId,
  title,
  price,
  imageUrl,
  favorite,
  onPlus,
  added = false,
  loading = false,
}) {
  const {isItemAdded, onAddToFavorite } = useContext(AppContext);
  const [isAdded, setIsAdded] = useState(added);

  const onClickPlus = () => {
    onPlus({ id, customId, title, imageUrl, price });
    setIsAdded(!isAdded);
    console.log(id, customId);
  };

  const onClickFavorite = () => {
    onAddToFavorite({ id, customId, favorite: !favorite });
  };

  return (
    <div className={styles.card} data-key={customId}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite} onClick={onClickFavorite}>
            <img src={favorite ? heartLiked : heartUnliked} alt="Unliked" />
          </div>
          <img width="100%" height={135} src={imageUrl} alt="Sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Price:</span>
              <b>{price}$</b>
            </div>
            <img
              className={styles.plus}
              onClick={onClickPlus}
              src={isItemAdded(id) ? checkedImg : plusImg}
              alt="Plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
