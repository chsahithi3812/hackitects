import React, { useState, useContext } from "react";
import axios from "axios";

 const BASE_URL = "http://localhost:8800/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  //calculate incomes
  const addIncome = async (income) => {
    console.log(income)
     const response = await axios
      .post("/add-income", income,{headers:{
        Authorization: "Bearer "+localStorage.getItem("jwt")
      }})
      .catch((err) => {
        setError(err.response.data.message);
      });
      getIncomes();
  };

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`,{headers:{
      Authorization: "Bearer "+localStorage.getItem("jwt")
    }});
    setIncomes(response.data);
    console.log(response.data);
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`,{headers:{
      Authorization: "Bearer "+localStorage.getItem("jwt")
    }});
    getIncomes();
  };

  const totalIncome = () => {
    let totalIncome = 0;
    
    if(incomes){
      console.log("entered")
     incomes.forEach((income) => {
      console.log(income.amount)
      totalIncome = totalIncome + income.amount;
    })
  }
    console.log(totalIncome)
    return totalIncome;
  };

  console.log(totalIncome());

  const addExpense = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-expense`, income,{headers:{
        Authorization: "Bearer "+localStorage.getItem("jwt")
      }})
      .catch((err) => {
        setError(err.response.data.message)
      });
   getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`,{headers:{
      Authorization: "Bearer "+localStorage.getItem("jwt")
    }});
    setExpenses(response.data);
    console.log(response.data);
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`,{headers:{
      Authorization: "Bearer "+localStorage.getItem("jwt")
    }});
    getExpenses();
  };

  const totalExpenses = () => {
    let totalIncome = 0;
    if(expenses){
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount;
    })}
    console.log(totalIncome)
    return totalIncome;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses]
    history.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return history.slice(0, 3)
}

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        expenses,
        totalIncome,
        addExpense,
        getExpenses,
        deleteExpense,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
