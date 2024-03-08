const { Category } = require("../model/Category");

exports.fetchCategories = async (req, res)=> {

  try{
    const categories = await Category.find({}).exec();
    res.status(200).json(categories)
  }catch(error){
    console.error(error);
    res.status(400).json({error: "Bad Request"})
  }
  
}

exports.createCategory = async (req, res)=> {
  // this category we have to get from the API body
  const category = new Category(req.body);
  try{
    const doc = await category.save();
    res.status(201).json(doc);
  } catch (err){
    res.status(500).json({error: "Internal Server Error"})
  }
};