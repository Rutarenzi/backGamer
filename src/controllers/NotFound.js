const notfound = (req,res) =>{
  res.status(404).json({status: 404, message:"Sorry!! this page is no Found"});
};

export default notfound;