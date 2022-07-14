const profileModel=require('../model/profileModel')
const Aws = require('../AWS/aws');  //for company logo
const mongoose = require("mongoose"); //here // check details in db


// ............................validation functions............................

const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId);
}
const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false

    return true;
}


//-------------------------------------First API (Creation)-------------------------------//
const businessCard= async function(req,res){
    try{
        const data = req.body;
        const file = req.files;

        const requiredFields = ["Name","Designation","companyName","contactNumber","emailId","websiteURL","socialURLs"];

        for (let i = 0; i < requiredFields.length; i++) {
            if (data[requiredFields[i]] === undefined) {
                return res.status(400).send({ status: false, message: `${requiredFields[i]} field is required` });
            }
            else if (data[requiredFields[i]].trim() === "null" || data[requiredFields[i]].trim() == '') {
                return res.status(400).send({ status: false, message: ` Please enter valid data` });
            }
        }
         //---------------------------email validation---------------------------------/
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/).test(data.emailId.trim())) {
            return res.status(400).send({ status: false, message: 'Enter a valid Email Id' });
        }

        let isDuplicateEmail = await profileModel.findOne({ emailId: data.emailId })
        if (isDuplicateEmail) {
            return res.status(400).send({ status: false, msg: "email already exists" })
        }

        //---------------------------contact number validation---------------------------------/
        if (!(/^[6789]\d{9}$/).test(data.contactNumber.trim())) {
            return res.status(400).send({ status: false, message: 'The mobile number must be 10 digits and should be only Indian number' });
        }

        let duplicateMobile = await profileModel.findOne({ contactNumber: data.contactNumber })
        if (duplicateMobile) {
            return res.status(400).send({ status: false, msg: "mobile number already exists" })
        }


        //----------------------------------uploading company logo in AWS--------------------------------//
        if (file && file.length > 0) {

            //checking whether the file is image or not
            if (file[0].mimetype.indexOf('image') == -1) {
                return res.status(400).send({ status: false, message: 'Only image files are allowed !' })
            }
            const card_url = await Aws.uploadFile(file[0]); //creating url
            data.companyLogo = card_url;
        }
        else {
            return res.status(400).send({ status: false, message: 'companyLogo is required !' })
        }
    ////-------------------------------------------Creation--------------------------------------/
        const card=await profileModel.create(data)
        return res.status(201).send({status:true,message:"business card successfully created",data:card})

    }catch(err){
        res.status(500).send({status:false,error:err.message})
    }
}




//-----------------------------------------------------------------------------------------------//
//---------------------------------------------fetch Business Detail----------------------------//
//---------------------------------------------------------------------------------------------//



const getBusinessCard= async function(req,res){
    try{
        const cardId = req.params.cardId;


    //--------------------------------------------validations-----------------------------//
   if (!isValid(cardId)) {
            return res.status(400).send({ status: false, ERROR: "business card Id required" })
        }

        if(!isValidObjectId(cardId)){
            return res.status(400).send({status:false,message:`${cardId} is not a valid cardId`})
        }


//---------------------------------- find card Details------------------------------------//
        const cardDetails = await profileModel.findById(cardId)
        if(!cardDetails){
            res.status(404).send({status:false,message:"card not found"})
        }
       
        return res.status(200).send({status: true, message: 'card details', data: cardDetails});

    
    }catch(err){
        res.status(500).send({status:false,error:err.message})
    }
}

module.exports.businessCard=businessCard
module.exports.getBusinessCard=getBusinessCard

//----------------------------------------------------------------------------------///