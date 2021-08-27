const router = require("express").Router();
const UserModel = require("../model/user");
const bcrypt = require("bcryptjs")

const { registerValidation , loginValidation } = require("../validation");
router.get("/register", (req, res) => {
  res.status(201).send("this is registration page for sure");
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  //joi validation check before saving the user in database
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking the user if already available
  const userAlreadyAvailiable = await UserModel({ email: email });
  if (userAlreadyAvailiable) {
    return res.status(400).send("user already registered");
  }

  //hashing of password
  const hashedPassword = await bcrypt.hash(password , 10)
  try {
    const newUser = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return res.status(200).send(savedUser);
  } catch (error) {
    console.log(error);
  }
});

router.get("/login" , (req,res)=>{
    res.status(200).send("this is login page");
})

router.post("/login" , async (req,res)=>{
    const {email , password} = req.body;
    if(!email || !password) {
        return res.status(400).send("fill all fields")
    }

    //joi validation for login
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  

    const loginUser = await UserModel.findOne({email:email})
    if(!loginUser){
        return res.status(400).send("email password wrong")
    }
    const validPassword = await bcrypt.compare(password , loginUser.password)
    if(!validPassword){
        return res.status(400).send("entries are wrong")
    }
    const token = jwt.sign({_id:loginUser._id}, process.env.TOKEN_SECRET)
        res.header("auth_token" , token).send(token)
})

module.exports = router;
