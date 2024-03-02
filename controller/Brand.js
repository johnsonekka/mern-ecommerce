const { Brand } = require("../model/Brand");

exports.fetchBrands = async (req, res)=> {

  try{
    const brands = await Brand.find({});
    res.status(200).json(brands)
  }catch(error){
    console.error(error);
    res.status(400).json({error: "Bad Request"})
  }
  
}

exports.createBrand = async (req, res)=> {
  // this brand we have to get from the API body
  const brand = new Brand(req.body);
  try{
    const doc = await brand.save();
    res.status(201).json(doc);
  } catch (err){
    res.status(500).json({error: "Internal Server Error"})
  }
};