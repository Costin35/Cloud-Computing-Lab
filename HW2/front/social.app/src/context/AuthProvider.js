import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("http://localhost:5108/api/Auth/current", {
          method: "GET",
          credentials: "include", 
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
          console.error("Request failed:", res.status);
        }
      } catch (error) {
        console.log("Not logged in or error fetching current user:", error);
        setUser(null);
      }
    };
    fetchCurrentUser();
  }, []);

  const login = async (email, password) => {
    const response = await fetch("http://localhost:5108/api/Auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }
    
    const userData = await response.json();
    setUser(userData);
    return userData;
  };

  const registerUser = async (username, email, password) => {
    const response = await fetch("http://localhost:5108/api/Auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }
    const userData = await response.json();
    setUser(userData);
    return userData;
  };

  const logout = async () => {
    await fetch("http://localhost:5108/api/Auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};