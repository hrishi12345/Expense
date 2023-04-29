import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import "./Home.css";
import { useSelector } from "react-redux";


export default function Home() {
  const expense = useRef();
  const amount = useRef();
  const description = useRef();
  const [items, setItems] = useState([]);
  const [total,setTotal]=useState(0)
  const token=useSelector(state=>state.auth.token)
  const to=token.slice(0,9)
  // Fetch data on initial load
  useEffect(() => {
    fetch(`https://hris-9fdcd-default-rtdb.firebaseio.com/items${to}.json?auth=${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const loadedItems = [];
        let totalAmount = 0;
        for (const key in data) {
          loadedItems.push({
            id: key,
            exp: data[key].exp,
            am: data[key].am,
            desc: data[key].desc,
          });
          totalAmount += parseInt(data[key].am);
        }
        setTotal(totalAmount);
        console.log(loadedItems);
        setItems(loadedItems);
      });
  }, []);
  

  const submitHandler = (event) => {
    event.preventDefault();
    const uniqueId = () => {
      const dateString = Date.now().toString(36);
      const randomness = Math.random().toString(36).substr(2);
      return dateString + randomness;
    };
    const item = {
      
      id: uniqueId(),
      exp: expense.current.value,
      am: amount.current.value,
      desc: description.current.value,
    };
    
    fetch(`https://hris-9fdcd-default-rtdb.firebaseio.com/items${to}.json`, {
      method: "POST",
      body: JSON.stringify(item),
    }).then(() => {
      setItems((prevItems) => [...prevItems, item]);
      setTotal((prevTotal) => prevTotal + parseInt(item.am));
    });
  
    expense.current.value = "";
    amount.current.value = "";
    description.current.value = "";
  };
  
  return (
    <>
      <Header />
      <main>
        <form onSubmit={submitHandler}>
          <label htmlFor="expense">Expense Type:</label>
          <input id="expense" ref={expense} />
          <label htmlFor="amount">Amount</label>
          <input id="amount" type="number" ref={amount} />
          <label htmlFor="description">Description:</label>
          <input id="description" ref={description} />
          <button type="submit">Add Expense</button>
        </form>
        <div className='expenses'>
  <ul className='expenses-list'>
  {items.map((data) => (
    
    <div  className="expense-item" key={data.id}>
      
        <h2>{data.exp}</h2>
        <div className="expense-item__price">₹{data.am}</div>
    
      <div className="expense-item__description">{data.desc}</div>
    </div>
  ))}
  </ul>
  </div>

       <span className="expenses-total__amount">TotalAmount :{total}</span>
      </main>
    </>
  );
}
