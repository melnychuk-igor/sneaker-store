import { useState, useEffect } from "react";
import "macro-css";

import "./App.css";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Card from "./components/Card";

import searchImg from "@/assets/search.svg";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch("https://68cfd717ec1a5ff33825ad56.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        setItems(json);
      });
  }, []);

  const onAddToCart = (obj) => {
    // setCartItems([...cartItems, obj])
    setCartItems((prev) => [...prev, obj]);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer items={cartItems} onClose={() => setCartOpened(false)} />
        )}
        <Header onClickCart={() => setCartOpened(true)} />
        <div className="content p-40">
          <div className="d-flex align-center justify-between mb-40">
            <h1>
              {searchValue ? `Search by query: ${searchValue}` : "All sneakers"}
            </h1>
            <div className="search-block d-flex">
              <img src={searchImg} alt="Search" />
              <input
                onChange={onChangeSearchInput}
                value={searchValue}
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="d-flex flex-wrap">
            {items
              .filter((item) => item.title.toLowerCase().includes(searchValue))
              .map((item, i) => (
                <Card
                  key={i} // обов'язково key
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onFavorite={() => console.log(item)}
                  onPlus={(obj) => onAddToCart(obj)}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
