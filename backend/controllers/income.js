const IncomeSchema= require("../models/ModelIncome")


exports.addIncome = async (req, res) => {
     console.log(req.body)
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
        const newIncome= await IncomeSchema.create({
            title,
            amount,
            category,
            description,
            date,
            createdBy: req.user,
          })
         
            res.status(201).json({
              _id: newIncome._id,
              title: newIncome.title,
              amount: newIncome.amount,
              category: newIncome.category,
              description: newIncome.description,
              date:newIncome.date,
              name: req.user.name,
            });
       
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Server Error'})
    }

   
}

exports.getIncomes = async (req, res) =>{
    const userId = req.user._id;
  try {
    const allIncomes = await IncomeSchema.find({ createdBy: userId });
    if (allIncomes) {
      return res.status(200).json({ Data: allIncomes});
    } else {
      return res.status(400).json({ Error: "Not Found" });
    }
  } catch (error) {
    res.status(400).json({ Error: err });
  }
}

exports.deleteIncome = async (req, res) =>{
    
        const userId = req.user._id;
        const paramId = req.params.id;
        try {
          const deletedStore = await IncomeSchema.findOneAndDelete({
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

exports.updateIncome=async(req,res)=>{
    const userId = req.user._id;
    const parameter = req.params.id;
    const body = req.body;
    if (!body) {
      return res.status(400).json({ Error: "Not Found" });
    }
    try {
      const updatedIncome = await IncomeSchema.findOneAndUpdate(
        { createdBy: userId, _id: parameter },
        body,
        {
          new: true,
        }
      );
      
      if (updatedIncome) {
        res.status(200).json({
            _id: updatedIncome._id,
            title:updatedIncome.title,
            amount:updatedIncome.amount,
            category: updatedIncome.category,
            description:updatedIncome.description,
            date:updatedIncome.date,
            name: req.user.name,
        });
      } else {
        res.status(400).json({ Error: "Failed to Update"});
      }
    } catch (error) {
      return res.status(400).json({ Error: error });
    }
  };

  exports.getIncome = async (req, res) => {
    const userId = req.user._id;
    const paramId = req.params.id;
    try {
      const idIncome = await IncomeSchema.find({ createdBy: userId, _id: paramId });

      if (idIncome) {
        return res.status(200).json({ Data: idIncome });
      } else {
        return res.status(400).json({ Error: "Not Found" });
      }
    } catch (err) {
      res.status(400).json({ Error: err });
    }
  };

