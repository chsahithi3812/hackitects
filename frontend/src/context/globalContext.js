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
    console.log(income);
    const response = await axios
      .post("/add-income", income, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    getIncomes();
  };

  // const getIncomes = async () => {
  //   const response = await axios.get(`${BASE_URL}get-incomes`,{headers:{
  //     Authorization: "Bearer "+localStorage.getItem("jwt")
  //   }});
  //   setIncomes(response.data);
  //   console.log(response.data);
  // };

  const getIncomes = async () => {
    const jwtToken = localStorage.getItem("jwt");
    console.log("JWT Token:", jwtToken);

    const response = await axios.get(`${BASE_URL}get-incomes`, {
      headers: {
        Authorization: "Bearer " + jwtToken,
      },
    });

    setIncomes(response.data);
    console.log(response.data);
  };

  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    getIncomes();
  };

  // const totalIncome = () => {
  //   let totalIncome = 0;
  //   console.log("incomes: ", incomes);

  //   if(incomes){
  //     console.log("entered")
  //    incomes.forEach((income) => {
  //     console.log(income.amount)
  //     totalIncome = totalIncome + income.amount;
  //   })
  // }
  //   console.log(totalIncome)
  //   return totalIncome;
  // };

  const totalIncome = () => {
    let totalIncome = 0;

    if (incomes && incomes.Data) {
      console.log("entered");
      incomes.Data.forEach((income) => {
        console.log(income.amount);
        totalIncome += income.amount;
      });
    }

    console.log(totalIncome);
    return totalIncome;
  };

  console.log(totalIncome());

  const addExpense = async (income) => {
    const response = await axios
      .post(`${BASE_URL}add-expense`, income, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
    getExpenses();
  };

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    setExpenses(response.data);
    console.log(response.data);
  };

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    });
    getExpenses();
  };

  const totalExpenses = () => {
    let totalExpense = 0;

    if (expenses && expenses.Data) {
      expenses.Data.forEach((expense) => {
        totalExpense += expense.amount;
      });
    }

    console.log(totalExpense);
    return totalExpense;
  };

  const totalBalance = () => {
    return totalIncome() - totalExpenses();
  };

  const transactionHistory = () => {
    const history = [];

    if (incomes && incomes.Data) {
      history.push(...incomes.Data);
    }

    if (expenses && expenses.Data) {
      history.push(...expenses.Data);
    }

    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt); // Sort by createdAt in descending order
    });

    return history.slice(0, 3); // Return the first three items
  };

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
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
