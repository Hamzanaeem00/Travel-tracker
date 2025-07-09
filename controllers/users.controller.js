import db from "../utils/db.js"
import { ErrorResponse, MissingValuesResponse, PositiveResponse } from "../utils/response.js"

export const getUser = async (req, res) => {
    try {
       const {rows} = await db.query("select * from users")
       console.log(rows)
        PositiveResponse(res , rows , "Data Has Been Reterived", 200)
   } catch (error) {
        console.error("Error in getUser:", error);
    ErrorResponse(res, error, "Failed to retrieve users", 500)
   }
}

export const createUser = async (req, res)=>{
  const  {userName , userEmail , userPassword, userRole, userStatus = true} = req.body
 
  // Identify Missing Values
    const userData = {
   userName: userName,
   userEmail: userEmail ,
   userPassword: userPassword,
   userRole: userRole,
   userStatus: userStatus || true
  }

  const emptyField = Object.entries(userData) 
  .filter(([key, value])=> !value )
  .map(([key])=> key)
  console.log("emptyField",emptyField)

  // check if any of the field is missing then return status 400 
    if (emptyField.length>0) {
  return MissingValuesResponse(res, emptyField,  "Please send all required values", 400);
}
   
 try {
   const result =  await db.query ("Insert into users (username , useremail , userpassword , userrole, userstatus) values ($1, $2, $3, $4, $5)", [userName ,  userEmail , userPassword, userRole, userStatus])
   PositiveResponse(res, result.rows[0], "User created successfully", 200);

 } catch (error) {
    console.error("Error in create user:", error);
    ErrorResponse(res, error, "Failed to Create User", 500)
 }
}

export const updateUser = async (req , res) =>{
       const  { id , userName , userEmail , userRole, userStatus = true} = req.body

       // Identify Missing Values
    const userData = {
   id: id,
   userName: userName,
   userEmail: userEmail ,
   userRole: userRole,
   userStatus: userStatus || true
  }

  const emptyField = Object.entries(userData) 
  .filter(([key, value])=> !value )
  .map(([key])=> key)
  console.log("emptyField",emptyField)

  // check if any of the field is missing then return status 400 
    if (emptyField.length>0) {
  return MissingValuesResponse(res, emptyField,  "Please send all required values", 400);
}
   try {
    const result = await db.query(`update users  SET username = $1, useremail = $2,  userrole = $3, userstatus = $4
       WHERE id = $5`, [
      userName,
      userEmail,
      userRole,
      userStatus,
        id
      ])
      PositiveResponse(res, result.rows[0], "User Updated successfully", 200);
      
   } catch (error) {
       console.log(error.message)
         ErrorResponse(res, error, "Failed to Update User", 500)
   }
}


export const deleteUser = async (req, res) => {
   const {id} = req.params
   console.log(id)
   if(!id){
       return MissingValuesResponse(res, "id",  "Please send all required values", 400);
   } 
try {
  
    const result = await db.query('Delete from users WHERE id= $1', [id])
    PositiveResponse(res, result.rows[0], "User Deleted successfully", 200);
} catch (error) {
     console.log(error.message)
         ErrorResponse(res, error, "Failed to Delete User", 500)
}
}

