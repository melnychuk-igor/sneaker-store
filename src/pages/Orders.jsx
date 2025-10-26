import {useEffect, useContext, useState} from 'react';
import axios from 'axios';

import Card from '@/components/Card';
import AppContext from '../App';

function Orders() {
	//   const { onAddToFavorite, onAddToCart } = useContext(AppContext);
	const [orders, setOrders] = useState([])

	  useEffect(() => {
		(async () => {
		const { data } = await axios.get("https://68fd007896f6ff19b9f6f38d.mockapi.io/order")
	console.log(data);
setOrders(data)
	
		})()

	  
	}, [])
//   const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
//   const [orders, setOrders] = React.useState([]);
//   const [isLoading, setIsLoading] = React.useState(true);

//   React.useEffect(() => {
//     (async () => {
//       try {
//         const { data } = await axios.get('https://60d62397943aa60017768e77.mockapi.io/orders');
//         setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
//         setIsLoading(false);
//       } catch (error) {
//         alert('Ошибка при запросе заказов');
//         console.error(error);
//       }
//     })();
//   }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>My orders</h1>
      </div>

      <div className="d-flex flex-wrap">
        {

		  orders.map((item, index) => (
			          <Card key={index}  {...item} />
		  ))
		  }
	
      </div>
    </div>
  );
}

export default Orders;