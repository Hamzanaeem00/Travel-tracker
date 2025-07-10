import db from "../utils/db.js";
import { ErrorResponse, PositiveResponse } from "../utils/response.js";

export const getUserVisitedCountries = async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT uservisitedcountries.id as visitedcountryid, users.username,  countries.countryname, uservisitedcountries.stayduration, uservisitedcountries.visiteddate, uservisitedcountries.comments from uservisitedcountries INNER JOIN users ON users.id = uservisitedcountries.userid INNER JOIN countries ON countries.id = uservisitedcountries.countryid;"
    );
    PositiveResponse(res, rows, "Data Has Been Reterived", 200);
  } catch (error) {
         console.log(error.message)
         ErrorResponse(res, error, "Failed to Get Countries", 500)
  }
};

export const getSpecificUserVisitedCountries = async (req, res) => {
    const {id} = req.params
    console.log("id==>",id)
  try {
    const { rows } = await db.query(
      "SELECT uservisitedcountries.id as visitedcountryid, users.username,  countries.countryname, uservisitedcountries.stayduration, uservisitedcountries.visiteddate, uservisitedcountries.comments from uservisitedcountries INNER JOIN users ON users.id = uservisitedcountries.userid INNER JOIN countries ON countries.id = uservisitedcountries.countryid WHERE users.id = $1", [
        id
      ]
    );
    PositiveResponse(res, rows, "Data Has Been Reterived", 200);
  } catch (error) {
         console.log(error.message)
         ErrorResponse(res, error, "Failed to get countries", 500)
  }
};

export const createUserVisitedCountries = async (req, res)=>{
    const  {userId , countryId , stayDuration, visitedDate, comments } = req.body
 
  // Identify Missing Values
    const userData = {
   userId: userId,
   countryId: countryId ,
   stayDuration: stayDuration,
   visitedDate: visitedDate,
   comments: comments
  }
  console.log(userData)

  const emptyField = Object.entries(userData) 
  .filter(([key, value])=> !value )
  .map(([key])=> key)
  console.log("emptyField",emptyField)

  // check if any of the field is missing then return status 400 
    if (emptyField.length>0) {
  return MissingValuesResponse(res, emptyField,  "Please send all required values", 400);
}
   
 try {
   const result =  await db.query ("Insert into uservisitedcountries (userid , countryid , stayduration , visiteddate, comments) values ($1, $2, $3, $4, $5)", [userId ,  countryId , stayDuration, visitedDate, comments])
   PositiveResponse(res, result.rows[0], "User created successfully", 200); 

 } catch (error) {
    console.error("Error in creating user visited country:", error);
    ErrorResponse(res, error, "Failed to Create User", 500)

 }
}