import { useContext } from "react";

import Card from "@/components/Card";

import {AppContext} from "../App";

function Favorites() {
  const {items, onAddToFavorite } = useContext(AppContext)
  
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>My favorites</h1>
      </div>

      <div className="d-flex flex-wrap">
        {items.map(
          (item, index) =>
            item.favorite && (
              <Card
                key={index}
                favorited={true}
                onFavorite={onAddToFavorite}
                {...item}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Favorites;
