const ExpenseSchema= require("../models/ModelExpense")


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date}  = req.body
    const userId = req.user._id;
   

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        const newExpense= await ExpenseSchema.create({
            title,
            amount,
            category,
            description,
            date,
            createdBy: req.user,
          })
         
            res.status(201).json({
              _id: newExpense._id,
              title: newExpense.title,
              amount: newExpense.amount,
              category: newExpense.category,
              description: newExpense.description,
              date:newExpense.date,
              name: req.user.name,
            });
       
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error'})
    }

   
}

exports.getExpenses = async (req, res) =>{
    const userId = req.user._id;
  try {
    const allExpenses = await ExpenseSchema.find({ createdBy: userId });
    if (allExpenses) {
      return res.status(200).json({ Data: allExpenses});
    } else {
      return res.status(400).json({ Error: "Not Found" });
    }
  } catch (error) {
    res.status(400).json({ Error: err });
  }
}

exports.deleteExpense = async (req, res) =>{
    
        const userId = req.user._id;
        const paramId = req.params.id;
        try {
          const deletedStore = await ExpenseSchema.findOneAndDelete({
            createdBy: userId,
            _id: paramId,
          });
          if (deletedStore) {
            return res.status(200).json({
              Data: "Successfully deleted",
            });
          } else {
            return res.status(400).json({ Error: "Failed to Delete" });
          }
        } catch (err) {
          res.status(400).json({ Error: err });
        }
      
};

exports.updateExpense=async(req,res)=>{
    const userId = req.user._id;
    const parameter = req.params.id;
    const body = req.body;
    if (!body) {
      return res.status(400).json({ Error: "Not Found" });
    }
    try {
      const updatedExpense = await ExpenseSchema.findOneAndUpdate(
        { createdBy: userId, _id: parameter },
        body,
        {
          new: true,
        }
      );
      
      if (updatedExpense) {
        res.status(200).json({
            _id: updatedExpense._id,
            title:updatedExpense.title,
            amount:updatedExpense.amount,
            category: updatedExpense.category,
            description:updatedExpense.description,
            date:updatedExpense.date,
            name: req.user.name,
        });
      } else {
        res.status(400).json({ Error: "Failed to Update"});
      }
    } catch (error) {
      return res.status(400).json({ Error: error });
    }
  };

  exports.getExpense = async (req, res) => {
    const userId = req.user._id;
    const paramId = req.params.id;
    try {
      const idExpense = await ExpenseSchema.find({ createdBy: userId, _id: paramId });

      if (idExpense) {
        return res.status(200).json({ Data: idExpense });
      } else {
        return res.status(400).json({ Error: "Not Found" });
      }
    } catch (err) {
      res.status(400).json({ Error: err });
    }
  };

