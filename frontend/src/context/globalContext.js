import React, { useState, useContext } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8800/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [errors, setErrors] = useState(null);

  const addIncome = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-income`, income)
      .catch((err) => {
        setErrors(err.response.data.message);
      });
  };

  return (
    <GlobalContext.Provider value={{addIncome}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
