const { addExpense, getExpenses, deleteExpense,updateExpense,getExpense } = require("../controllers/expense");
const { addIncome, getIncomes, deleteIncome,updateIncome,getIncome } = require('../controllers/income');
const validateToken = require("../middleware/validateToken");
const router = require('express').Router();


router.post('/add-income', validateToken,addIncome)
    .get('/get-incomes',validateToken, getIncomes)
    .delete('/delete-income/:id', validateToken,deleteIncome)
    .put('/update-income/:id', validateToken,updateIncome)
    .get('/get-income/:id',validateToken,getIncome)
    .post('/add-expense', validateToken,addExpense)
    .get('/get-expenses', validateToken,getExpenses)
    .delete('/delete-expense/:id', validateToken,deleteExpense)
    .put('/update-expense/:id',validateToken,updateExpense)
    .get('/get-expense/:id',validateToken,getExpense)

module.exports = router