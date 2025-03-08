import { createContext, useContext, useState } from "react";

// Create the context
const UserContext = createContext()

// Provide the context
export const UserProvider = ({ children }) => {
  // Initialize with localStorage value if it exists
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null; // Return null during server-side rendering
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Use the context
export const useUser = () => useContext(UserContext);
