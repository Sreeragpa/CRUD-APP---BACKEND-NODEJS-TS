import { Request, Response, response } from "express";
import { UserModel } from "../db/UserModel";
// import * as jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { signJWT } from "../utils/jwt.utils";

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; iat: Date; exp: Date };
}

class UserController {
  getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await UserModel.find();
      return res.status(200).json({ data: users });
    } catch (error) {
      return res.status(400);
    }
  };

  getUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = await UserModel.findOne(
        { _id: req.user?.id },
        { name: 1, email: 1, phone: 1, profile: 1, _id: 0 }
      );
      // setTimeout(()=>{
        return res.status(200).json({ data: user });
      // },2000)
    } catch (error) {
      return res.status(400);
    }
  };

  createUser = async (req: Request, res: Response) => {
    try {
      console.log("hehe");
      console.log(req.body);
      
      
      const { name, email, phone, password } = req.body;

      const isRegistered = await UserModel.findOne({email:email})
      if(isRegistered){
        return res.status(409).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new UserModel({
        name: name,
        email: email,
        phone: phone,
        password: hashedPassword,
      });
      await user.save();
      return res.status(201).json({ message: "User Created", data: user });
    } catch (error) {
      return res.status(400).json({Error:error});
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, email, phone } = req.body;

      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: id },
        { $set: { name, email, phone } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User Not Found" });
      }
      return res
        .status(200)
        .json({ message: "User Updated Successfully", data: updatedUser });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deletedUser = await UserModel.findByIdAndDelete({ _id: id });
      return res
        .status(200)
        .json({ message: "User Deleted Successfully", data: deletedUser });
    } catch (error) {
      return res.status(500);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      
      const user: any = await UserModel.findOne({ email: email });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Creating Access Token JWT

      const payload = { id: user._id, email: user.email,type:"user" };  

      const accessToken = signJWT(payload, "1h");
      const data = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        profile: user.profile,
        accessToken: accessToken}

        console.log(data);
        

        setTimeout(()=>{
          return res
          .status(200)
          .json({ data: data, message: "Login Success" });
        },2000)
    } catch (error) {
      console.log(error);
    }
  };

  adminlogin = async (req: Request, res: Response) => {
    try {
      const admincred = {
        email: "admin@gmail.com",
        password: "123",
        type: "admin",
      };
      const { email, password } = req.body;

      if (admincred.email === email && admincred.password === password) {
        const { email, type } = admincred;
        const payload = { email, type };
        
        const accessToken = signJWT(payload, "1h");
        return res
          .status(200)
          .json({ accessToken: accessToken, message: "Login Success" });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }
    } catch (error) {}
  };

  updateUserProfile = async (req: AuthenticatedRequest, res: Response)=>{
    console.log(req.body);
    const imgUrl = req.body.url
    console.log(req.user?.id );
    const updateduser = await UserModel.findOneAndUpdate({_id:req.user?.id},{$set:{profile:imgUrl}},{new: true})

    
    return res.status(200).json({data:updateduser,message:"Image Uploaded"})
    
  }
}

export default new UserController();
