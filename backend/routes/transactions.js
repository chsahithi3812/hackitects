const { addExpense, getExpense, deleteExpense,updateExpense } = require("../controllers/expense");
const { addIncome, getIncomes, deleteIncome,updateIncome } = require('../controllers/income');
const validateToken = require("../middleware/validateToken");
const router = require('express').Router();


router.post('/add-income', validateToken,addIncome)
    .get('/get-incomes',validateToken, getIncomes)
    .delete('/delete-income/:id', validateToken,deleteIncome)
    .put('/update-income/:id', validateToken,updateIncome)
    .post('/add-expense', validateToken,addExpense)
    .get('/get-expenses', validateToken,getExpense)
    .delete('/delete-expense/:id', validateToken,deleteExpense)
    .put('/update-expense/:id',validateToken,updateExpense)

module.exports = router