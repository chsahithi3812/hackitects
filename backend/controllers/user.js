const userModel = require("../models/ModelUser");
const generateToken = require("../middleware/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ Error: "All Fields Required" });
  } else if (/[^a-zA-Z]/.test(name)) {
    return res.status(400).json({ Error: "Username must be in alphabet" });
  } else if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) {
    return res.status(400).json({ Error: "Enter a valid email" });
  }
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400).json({ Error: "User Already Exists" });
  }

  const newUser = await userModel.create({
    name,
    email,
    password,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } else {
    res.status(400).json({ Error: "Failed To Create New User" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ Error: "All Fields Required" });
  }
  const user = await userModel.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: await generateToken(user._id),
    });
  } else {
    res.status(400).json({ Error: "Wrong Credentials" });
  }
};

const updateUser = async (req, res) => {
  const body = req.body;
  body.name = body.name ? body.name : "";
  body.email = body.email ? body.email : "";
  if (body.name === "" && body.email === "") {
    return res.status(400).json({ Error: "Empty Fields Cannot Be Updated" });
  } else if (body.name !== "") {
    if (/[^a-zA-Z]/.test(body.name)) {
      return res.status(400).json({ Error: "Username must be in alphabet" });
    }
  } else if (body.email !== "") {
    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(body.email)) {
      return res.status(400).json({ Error: "Enter a valid email" });
    }
  }
  if (body.name === "") {
    delete body.name;
  }
  if (body.email === "") {
    delete body.email;
  }
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      body,
      {
        new: true,
      }
    );
    if (updatedUser) {
      res.status(200).json({
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(400).json({ Error: "Failed to upload" });
    }
  } catch (error) {
    return res.status(400).json({ Error: error });
  }
};

const resetPassword = async (req, res) => {
  const userId = req.user._id;
  const { oldpassword, newpassword } = req.body;
  try {
    const user = await userModel.findOne({ _id: userId });
    if (await user.matchPassword(oldpassword)) {
      const hashedPassword = await user.hashPassword(newpassword);
      const resetPassword = await userModel.findOneAndUpdate(
        { _id: user._id },
        { password: hashedPassword },
        {
          new: true,
        }
      );
      if (resetPassword) {
        return res.status(200).json({ Data: "Sucessfully Password was reset" });
      } else {
        return res.status(400).json({ Error: "Request cannot be processed" });
      }
    } else {
      return res.status(400).json({ Error: "Request cannot be processed" });
    }
  } catch (error) {
    return res.status(400).json({ Error: error });
  }
};
const loginSucess=(req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
}
const loginFail= (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
}


module.exports = {
  registerUser,
  loginUser,
  updateUser,
  resetPassword,
  loginSucess,
  loginFail,
  

  };