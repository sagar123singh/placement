
Schema design 
Profile
_id: ObjectId
Name: String 
Designation: String
companyName: String
contactNumber: Number
emailId: String
websiteURL: String
socialURLs:
Array of three strings
companyLogo: String(Image URL)
Controller design discussion
Getting a single profile using _id
GET /business-card/:id
Early return if invalid id format
Response object
Status code for success as well as other errors
Creating a new profile
POST /business-card
parseJSON
Validations
Response object 
Status code for success as well as other errors
