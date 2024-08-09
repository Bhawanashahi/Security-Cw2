const Users = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = async (req, res) => {
    // step 1 : Check if data is coming or not
    console.log(req.body);

    // step 2 : Destructure the data
    const { firstName, lastName, email, phone, password } = req.body;

    // step 3 : validate the incomming data
    if (!firstName || !lastName || !email || !phone || !password) {
        return res.json({
            success: false,
            message: "Please fill all the fields."
        })
    }

    // step 4 : try catch block
    try {
        // step 5 : Check existing user
        const existingUser = await Users.findOne({ email: email })
        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists."
            })
        }

        // password encryption
        const randomSalt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, randomSalt)

        // step 6 : create new user
        const newUser = new Users({
            // fieldname : incomming data name
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone:phone,
            password: encryptedPassword,
        })

        // step 7 : save user and response
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "User created successfully."
        })


    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")
    }


}

const loginUser = async (req, res) => {
    // Step 1 : Check if data is coming or not
    console.log(req.body);

    // step 2 : Destructure the data
    const {email, password} = req.body;

    // step 3 : validate the incomming data
    if(!email || !password){
        return res.json({
            success : false,
            message : "Please fill all the fields."
        })
    }

    // step 4 : try catch block
    try {
        // step 5 : Find user
        const user = await Users.findOne({email : email}) // user store all the data of user
        if(!user){
            return res.json({
                success : false,
                message : "User does not exists."
            })
        }
        // Step 6 : Check password
        const passwordToCompare = user.password;
        const isMatch = await bcrypt.compare(password, passwordToCompare)
        if(!isMatch){
            return res.json({
                success : false,
                message : "Password does not match."
            })
        }

        // Step 7 : Create token
        const token = jwt.sign(
            {id : user._id, isAdmin : user.isAdmin},
            process.env.JWT_TOKEN_SECRET,
        )

        // Step 8 : Send Response
        res.status(200).json({
            success : true,
            token : token,
            userData : user,
            message : "User logged in successfully."
        })
        
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}
const getAllUsers = async (req, res) => {
    try{
        const listOfUsers =  await Users.find();
        res.json({
            success: true,
            message: "User fetched successfully",
            users : listOfUsers
        })
  
    }catch(error){
        res.status(500).json("Server Error")
  
    }
  }
  
  // get product by id
  const getSingleUsers = async (req ,res)=>{
    const id=req.params.id;
    if(!id) {return res.json(
    {
     message: 'No record with given id:',
     success:false,
    }
      )
    }
      try{
        const singleUser = await Users.findById(id);
        res.json({
          success:true,
          message: 'User Fetched',
          user: singleUser,
        })
      }catch(error){
        console.log(error);
        res.status(500).json('Server Error')
      }
  }

  const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone, password } = req.body;

        if (!firstName || !lastName || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        const updatedUser = await Users.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            phone,
            password
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};



const deleteUser = async (req, res) => {
        try {
            const deleteUser = await Users.findByIdAndDelete(req.params.id);
            if(!deleteUser){
                return res.json({
                    success: false,
                    message: "User not found"
                })
            }
            res.json({
                success: true,
                message: "User deleted Sucesfully"
            })
    
        }catch (error){
            console.log(error);
            res.status(500).json({
                success: false,
                message : "server error"
            })
        }
}

module.exports = {
    createUser, loginUser,updateUser,deleteUser, getSingleUsers, getAllUsers
}