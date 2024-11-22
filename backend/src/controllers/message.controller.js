import User from '../models/auth.model.js'
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) =>{
    const myId = req.user._id;
    try{
        const users = await User.find({_id: {$ne: myId}});
        res.status(200).json(users);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
}

export const getMessagesForChat = async (req, res) => {
    const myId = req.user._id;
    const recieverId = req.params.id;
    try{
        const messages = await Message.find({$or: [{sender: myId, reciever: recieverId}, {sender: recieverId, reciever: myId}]});
        res.status(200).json(messages);
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
}

export const sendMessage = async (req, res) => {
    const myId = req.user._id;
    const recieverId = req.params.id;
    try{
        const message = await Message.create({
            sender: myId,
            reciever: recieverId,
            message: req.body.message
        })
        res.status(200).send({message: "Message sent", message: message});
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Something went wrong"});
    }
}