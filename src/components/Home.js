import { useEffect, useRef, useState } from "react";
import Header from "./Header";

export default function Home() {
  const expense = useRef();
  const amount = useRef();
  const description = useRef();
  const [items, setItems] = useState([]);

  // Fetch data on initial load
  useEffect(() => {
    fetch("https://hris-9fdcd-default-rtdb.firebaseio.com/items.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const loadedItems = [];
for (const key in data) {
  loadedItems.push({
    id: key,
    exp: data[key].item.exp,
    am: data[key].item.am,
    desc: data[key].item.desc,
  });
}
console.log(loadedItems)
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
    fetch("https://hris-9fdcd-default-rtdb.firebaseio.com/items.json", {
      method: "POST",
      body: JSON.stringify(item),
    }).then(() => {
      setItems((prevItems) => [...prevItems, item]);
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
          <input id="expense" ref={expense}></input>
          <label htmlFor="amount">Amount</label>
          <input id="amount" type="number" ref={amount}></input>
          <label htmlFor="description">description:</label>
          <input id="description" ref={description}></input>
          <button type="submit">Add Expense</button>
        </form>
        {items.map((data) => (
          <div key={data.id}>
            <ul>{data.exp}</ul>
            <ul>{data.am}</ul>
            <ul>{data.desc}</ul>
          </div>
        ))}
      </main>
    </>
  );
}
