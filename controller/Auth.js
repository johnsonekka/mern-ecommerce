const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  // this user we have to get from the API body
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(201).json({id: doc.id,role: doc.role});
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.loginUser = async (req, res) => {
  // this user we have to get from the API body
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    // this is just temporary we will use strong password encrypted
    console.log({user})
    if(!user) {
      res.status(401).json({message: 'no such user email'});
    }else if(user.password === req.body.password) {
      // TODO: We will make addresses independent of the login 
      res.status(200).json({id: user.id, role: user.role});
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
