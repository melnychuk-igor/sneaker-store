import Card from "@/components/Card";

import searchImg from "@/assets/search.svg";
import btnRemoveImg from "@/assets/btn-remove.svg";

function Home({
  items,
  cartItems,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={isLoading ? `skeleton-${index}` : item.customId}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        added={cartItems.some(
          (obj) => String(obj.customId) === String(item?.customId)
        )}
        loading={isLoading}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Search by query: ${searchValue}` : "All sneakers"}
        </h1>
        <div className="search-block d-flex">
          <img src={searchImg} alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue('')}
              className="clear cu-p"
              src={btnRemoveImg}
              alt="Clear"
            />
          )}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Search..." />
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
