const IncomeSchema= require("../models/ModelIncome")


exports.addIncome = async (req, res) => {
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
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) =>{
    
        const userId = req.user._id;
        const paramId = req.params.id;
        try {
          const deletedStore = await IncomeSchema.findOneAndDelete({
            createdBy: userId,
            id: paramId,
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
  const paramId = req.params.id;
  const body = req.body;
  
  if(body.title==="" && body.category==="" && body.description==="" && body.date==="" && body.income==="" )
   {
    return res.status(400).json({ Error: "Empty Fields Cannot Be Updated" });
  }
  if (body.title === "") {
    delete body.title;
  }
  if (body.category === "") {
    delete body.category;
  }
  if (body.description=== "") {
    delete body.description;
  }
  if (body.date === "") {
    delete body.date;
  }
  if (body.amount === "") {
    delete body.amount;
  }
  try {
    const updatedIncome = await IncomeSchema.findOneAndUpdate(
      { createdBy: userId, id: paramId },
      body,
      {
        new: true,
      }
    );
    if (updatedIncome) {
      res.status(200).json({
             _id: updatedIncome._id,
              title: updatedIncome.title,
              amount: updatedIncome.amount,
              category: updatedIncome.category,
              description: updatedIncome.description,
              date:updatedIncome.date,
              name: req.user.name,
      });
    } else {
      res.status(400).json({ Error: "Failed to Update" });
    }
  } catch (error) {
    return res.status(400).json({ Error: error });
  }    

}