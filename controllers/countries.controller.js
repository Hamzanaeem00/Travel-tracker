import db from "../utils/db.js";
import { ErrorResponse, PositiveResponse } from "../utils/response.js";

export const getCountries = async (req, res) => {
   try {
     const {rows} = await db.query("select * from countries");
     console.log(rows)
    return PositiveResponse(res, rows, "Data Has been Retrived",  200 )

  } catch (error) {
    return ErrorResponse(res, error, "Failed to retrieve countries", 500 ) 
  }
};
