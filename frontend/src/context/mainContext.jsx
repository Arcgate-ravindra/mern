import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { URL } from "../url";

const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(URL + "/api/auth/refetch", {
          withCredentials: true,
        });
        if (res.data) {
          setUser(res.data);
        }
      } catch (error) {
        console.log("errror while fetching the refetch api", error.message);
      }
    };
    getUser();
  }, []);

  const context = {
    user: user || null,
    setUser,
  };
  return (
    <ToDoContext.Provider value={context}>{children}</ToDoContext.Provider>
  );
};

export default ToDoContext;
