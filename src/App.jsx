import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import "macro-css";
import "./App.css";

import Header from "@/components/Header";
import Drawer from "@/components/Drawer";
import Home from "@/pages/Home";
import Favorites from "@/pages/Favorites";

export const AppContext = createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const cartsResponse = await axios.get(
        "https://68cfd717ec1a5ff33825ad56.mockapi.io/cart"
      );
      const itemsResponse = await axios.get(
        "https://68cfd717ec1a5ff33825ad56.mockapi.io/items"
      );

      setIsLoading(false);
      setItems(itemsResponse.data);
      setCartItems(cartsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    const existingItem = cartItems.find(
      (item) => String(item.customId) === String(obj.customId)
    );

    if (existingItem) {
      axios.delete(
        `https://68cfd717ec1a5ff33825ad56.mockapi.io/cart/${existingItem.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => String(item.customId) !== String(obj.customId))
      );
    } else {
      axios.post("https://68cfd717ec1a5ff33825ad56.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveItem = (customId) => {
    const itemToRemove = cartItems.find((item) => item.customId === customId);

    if (itemToRemove) {
      axios.delete(
        `https://68cfd717ec1a5ff33825ad56.mockapi.io/cart/${itemToRemove.id}`
      );
    }

    setCartItems((prev) => prev.filter((item) => item.customId !== customId));
  };

  const onAddToFavorite = async ({ customId, favorite }) => {
    setItems((prev) =>
      prev.map((item) =>
        item.customId === customId ? { ...item, favorite } : item
      )
    );
  
    try {
      const serverItem = items.find((item) => String(item.customId) === String(customId));
      const serverId = serverItem?.id;
  
      if (!serverId) {
        console.warn("❌ Missing serverId for", customId, serverItem);
        return;
      }
    
      await axios.put(
        `https://68cfd717ec1a5ff33825ad56.mockapi.io/items/${String(serverId)}`,
        { favorite: favorite },
      );
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => obj.id === id);
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
    }}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
          />
        )}

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
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorites"
            exact
            element={
              <Favorites onAddToFavorite={onAddToFavorite} />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
