import { useState } from "react";
import "./App.css";

interface Coin {
  id: string;
  name: string;
  symbol: string;
}

function App() {
  const [data, setData] = useState<Coin[]>([]); // type data as an array of coin objects

  function retrieveData(event) {
    event.preventDefault();
    console.log("Retrieving data...");

    const url = "https://api.coingecko.com/api/v3/coins/bitcoin";

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json: Coin[]) => {
        console.log(json);
        setData(json); // Store the fetched data in the state
      })
      .catch((err) => console.error("error: " + err));
  }

  return (
    <div className="text-white m-5">
      <form action="" className="flex flex-col gap-3 max-w-64">
        <label htmlFor="getData">Type crypto here</label>
        <input
          type="text"
          name="getData"
          id="getData"
          className="text-black p-3"
        />
        <button
          type="submit"
          onClick={retrieveData}
          className="bg-slate-500 p-3"
        >
          Click to retrieve data
        </button>
      </form>
      {data.length > 0 && (
        <div>
          {data.map((item) => (
            <div key={item.id}>
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Symbol:</strong> {item.symbol}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
