import Post from "@/models/Post";
import { getCost, getPrice } from "@/pages/customers";
import dbConnect from "@/utils/dbConnect";
import nc from "next-connect";

dbConnect()


const handler = nc().get(async(req, res) => {
   
    try {
        const posts = await Post.find({})
        res.send(posts);
        // res.send({message:"hellooo"})
    } catch (error) {
        return  res.status(400).json({message:'Sorry something went wrong !'});
    }

    
  }).post(async(req, res) => {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear();
    const date = `${day}/${month}/${year}`

    const {name,value} = req.body
    const price = getPrice(Number(value)) ; 
    const cost = getCost(Number(value))

    const newpost = new Post({name , value , price , cost , date:date })
    try {
        await newpost.save()
        res.send(newpost);
    } catch (error) {
        return  res.status(400).json({message:'Sorry added something went wrong !'});
    }
  })
export default handler