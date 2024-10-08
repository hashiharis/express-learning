
let userDB = [];

const signup=(req,res)=>{

    try {
        const { name, email, password } = req.body;
    
        if (!name|| !email|| !password) {
          return res.status(400).json({ message: "All fields are required" });
        }
    
        const isEmailTaken = userDB.find((user) => user.email === email);
    
        if (isEmailTaken) {
          return res.status(400).json({ message: "Email already exist" });
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid entry" });
        }
    
        if (password.length < 8) {
          return res
            .status(400)
            .json({ message: "Password must be atleast 8 characters long" });
        }
    
        const userData = { id: userDB.length + 1, name, email, password };
        userDB.push(userData);
        return res
          .status(201)
          .json({ message: "Registration successful", data: userDB });
      } catch (error) {
        console.log("Signup error", error);
        return res.status(500).json({ message: "Server error" });
      }

}


const signin =(req,res)=>{
    try {
        const { email, password } = req.body;
    
        if (!email||!password) {
          return res
            .status(400)
            .json({ message: "Please enter email and password" });
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ message: "Invalid entry" });
        }
    
        if (password.length < 8) {
          return res
            .status(400)
            .json({ message: "Password must be atleast 8 characters long" });
        }
    
        const userFound = userDB.find((user) => user.email === email);
    
        if (!userFound) {
          return res
            .status(400)
            .json({ message: "Incorrect email id and password" });
        }
    
        if (userFound.password !== password) {
          return res
            .status(400)
            .json({ message: "Incorrect email id and password" });
        }
    
        return res
          .status(200)
          .json({ message: "Login successful", user: userFound });
      } catch (error) {
        console.log("Sign In error", error);
        return res.status(500).json({ message: "Server error" });
      }
    }

    const getAllUsers=(req,res)=>{
        try {
            return res.status(200).json({ message: "User details", users: userDB });
          } catch (error) {
            console.log("fetch error", error);
            return res.status(500).json({ message: "Server error" });
          }
    }

    const getUserById=(req,res)=>{
        try {
            const { id } = req.params;
            const user = userDB.find((user) => user.id == id);
            if (!user) {
              return res.status(400).json({ message: "User not found" });
            }
            return res.status(200).json({ message: "User Found", data: user });
          } catch (error) {
            console.log("fetch error", error);
            return res.status(500).json({ message: "Server error" });
          }
    }

    const editUserDetails=(req,res)=>{
        try {
            const { id } = req.params;
            const{name,email,password}=req.body;
            const userFound = userDB.find((user) => user.id == id);
            if (!userFound) {
              return res.status(400).json({ message: "User not found" });
            }
            
            if(!name && !email && !password){
                return res.status(400).json({message:"user details not found"})
            }
            
            if(name){
                if(userFound.name!==name){
                    userFound.name=name;
                }
            }
            if(email){
                if(userFound.email!==email){
                    userFound.email=email;
                }
            }
            if(password){
                if(userFound.password!==password){
                    userFound.password=password;
                }
            }
        
            return res
              .status(200)
              .json({ message: "password updated", updated: userDB });
          } catch (error) {
            console.log("updation error", error);
            return res.status(500).json({ message: "Server error" });
          }
    }

    const deleteUserById=(req,res)=>{
        try {
            const { id } = req.params;
            const userFound = userDB.find((user) => user.id == id);
            if (!userFound) {
              return res.status(404).json({ message: "User not found" });
            }
            userDB = userDB.filter((user) => user.id !== parseInt(id));
            console.log("userDB=>", userDB);
            return res
              .status(200)
              .json({ message: "User deleted successfully", data: userDB });
          } catch (error) {
            console.log("deletion error", error);
            return res.status(500).json({ message: "Server error" });
          }
    }

module.exports={signup,signin,getAllUsers,getUserById,editUserDetails,deleteUserById}