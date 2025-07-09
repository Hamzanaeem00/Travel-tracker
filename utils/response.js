export const PositiveResponse = (res, rows, message, status = 200) => {
  const response = res.status(status).json({
    message: message,
    data: rows,
    success: true,
  });

  return response;
};

export const ErrorResponse = (res, error, message, status = 500) => {
  return res.status(status).json({
    error: error.message,
    message: message,
    success: false,
  });

};

export const MissingValuesResponse = (res, values, message, status = 400)=>{
  return res.status(status).json({
    MissingData: `${values} is Missing`, 
    message: message,
    success: false,
  })
}