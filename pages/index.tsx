import { useState } from "react";

const Home = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <h1>hello {counter}</h1>
      <button
        onClick={() => {
          setCounter((prev) => prev + 1);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Home;
