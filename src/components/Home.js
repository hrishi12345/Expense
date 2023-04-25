import { useRef, useState } from "react";
import Header from "./Header";

export default function Home() {
  const expense = useRef();
  const amount = useRef();
  const description = useRef();
  const [items, setItems] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();

    const item = {
      exp: expense.current.value,
      am: amount.current.value,
      desc: description.current.value,
    };

    setItems((prevItems) => [...prevItems, item]);

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
        {items.map((data, index) => (
          <div key={index}>
            <ul>{data.exp}</ul>
            <ul>{data.am}</ul>
            <ul>{data.desc}</ul>
          </div>
        ))}
      </main>
    </>
  );
}
