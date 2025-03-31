import { useEffect, useState } from "react";
import "./styles.css";

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch("http://localhost:5108/api/Quotes/quote", {
          credentials: "include",
        });
        const data = await res.json();
        if (data.results) setQuotes(data.results);
        else setError("No quotes available.");
      } catch (err) {
        setError("Failed to load quotes.");
      }
    };
    fetchQuotes();
  }, []);

  return (
    <main className="Quotes">
      <h1 className="quotes-header">Daily Quotes</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="quote-grid">
        {quotes.map((quote) => (
          <div key={quote._id} className="quote-card">
            <blockquote>{quote.content}</blockquote>
            <p className="author">— {quote.author}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Quotes;