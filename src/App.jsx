import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import "macro-css";
import "./App.css";

import Header from "@/components/Header";
import Drawer from "@/components/Drawer";
import Home from "@/pages/Home";
import Favorites from "@/pages/Favorites";
import Orders from "@/pages/Orders";

export const AppContext = createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, itemsResponse] = await Promise.all([
          axios.get("https://68cfd717ec1a5ff33825ad56.mockapi.io/cart"),
          axios.get("https://68cfd717ec1a5ff33825ad56.mockapi.io/items"),
        ]);

        setIsLoading(false);
        setItems(itemsResponse.data);
        setCartItems(cartResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных ;(");
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const existingItem = cartItems.find(
      (item) => String(item.customId) === String(obj.customId)
    );

    if (existingItem) {
      setCartItems((prev) =>
        prev.filter((item) => String(item.customId) !== String(obj.customId))
      );
      await axios.delete(
        `https://68cfd717ec1a5ff33825ad56.mockapi.io/cart/${existingItem.id}`
      );
    } else {
      setCartItems((prev) => [...prev, obj]);
      const { data } = await axios.post(
        "https://68cfd717ec1a5ff33825ad56.mockapi.io/cart",
        obj
      );
      // setCartItems((prev) =>
      //   prev.map((item) => {
      //     if (item.customId === data.customId) {
      //       return {
      //         ...item,
      //         id: data.id,
      //       };
      //     }
      //     return item;
      //   }),
      // );
    }
  };

  const onRemoveItem = (customId) => {
    try {
      const itemToRemove = cartItems.find((item) => item.customId === customId);
      if (itemToRemove) {
        axios.delete(
          `https://68cfd717ec1a5ff33825ad56.mockapi.io/cart/${itemToRemove.id}`
        );
      }
      setCartItems((prev) => prev.filter((item) => item.customId !== customId));
    } catch (error) {
      alert("Error deleting from cart");
      console.error(error);
    }
  };

  const onAddToFavorite = async ({ customId, favorite }) => {
    try {
      setItems((prev) =>
        prev.map((item) =>
          item.customId === customId ? { ...item, favorite } : item
        )
      );

      const serverItem = items.find(
        (item) => String(item.customId) === String(customId)
      );
      const serverId = serverItem?.id;

      await axios.put(
        `https://68cfd717ec1a5ff33825ad56.mockapi.io/items/${String(serverId)}`,
        { favorite: favorite }
      );
    } catch (error) {
      alert("Failed to add to favorites");
      console.error("Update error:", error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (customId) => {
    return cartItems.some((obj) => obj.customId === customId);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorites"
            exact
            element={<Favorites onAddToFavorite={onAddToFavorite} />}
          />
          <Route path="/orders" exact element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
