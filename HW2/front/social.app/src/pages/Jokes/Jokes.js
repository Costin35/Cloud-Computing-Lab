import { useEffect, useState } from "react";
import "./styles.css";

const Jokes = () => {
  const [jokes, setJokes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const res = await fetch("http://localhost:5108/api/joke/list", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch jokes");
        const data = await res.json();
        setJokes(data.jokes || []);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchJokes();
  }, []);

  return (
    <main className="jokes-container">
      <h1 className="jokes-header">Daily Jokes</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && jokes.length === 0 && <p>Loading jokes...</p>}
      <ul className="jokes-list">
        {jokes.map((joke, idx) => (
          <li key={idx} className="joke-card">
            {joke.type === "single" ? (
              <p>{joke.joke}</p>
            ) : (
              <>
                <p><strong>{joke.setup}</strong></p>
                <p>{joke.delivery}</p>
              </>
            )}
            <p className="joke-category">Category: {joke.category}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Jokes;
