const Products = require('../model/productModel');
const cloudinary = require('cloudinary');


const createProduct = async (req,res) =>{
    // step 1 : Check incomming data
    console.log(req.body);
    console.log(req.files);

    // step:2 destructuring
    const {productName, 
        productPrice, 
        // productDescription, 
        productCategory} = req.body;

    const {productImage} = req.files;

    // step 3 : validate the data
    if(!productName || !productPrice ||  !productCategory || !productImage){
        return res.json({
            success : false,
            message : "Please fill all the fields."
        })
    }

        // step 4 : try catch block
        try {
            // step 5 : upload image to cloudinary
            const uploadedImage = await cloudinary.v2.uploader.upload(
                productImage.path,
                {
                    folder : "products",
                    crop : "scale"
                }
            )
    
            // save the products
            const newProduct = new Products({
                productName : productName,
                productPrice : productPrice,
                // productDescription : productDescription,
                productCategory : productCategory,
                productImageUrl : uploadedImage.secure_url
            })
            await newProduct.save();
            res.status(200).json({
                success : true,
                message : "Product created successfully",
                data : newProduct
            })
    
            
        } catch (error) {
            console.log(error);
            res.status(500).json("Server Error")
        }

}


//function for getting all the product
const getAllProducts = async (req, res) => {
  try{
      const listOfProducts =  await Products.find();
      res.json({
          success: true,
          message: "Product fetched successfully",
          products : listOfProducts
      })

  }catch(error){
      res.status(500).json("Server Error")

  }
}


// get product by id
const getSingleProduct = async (req ,res)=>{
  const id=req.params.id;
  if(!id) {return res.json(
  {
   message: 'No record with given id:',
   success:false,
  }
    )
  }
    try{
      const singleProduct = await Products.findById(id);
      res.json({
        success:true,
        message: 'Product Fetched',
        product: singleProduct,
      })
    }catch(error){
      console.log(error);
      res.status(500).json('Server Error')
    }
}
//Create order 
const createOrder = async (req, res) => {
  console.log(req.body);
  const{userId , productId , quantity} = req.body;
  if(!userId || !productId || !quantity){
    return res.json({
      success: false,
      message : "All field are required"
    })
  }
  try {
    const newOrder = new Orders({
      userId : userId,
      productId: productId,
      quantity: quantity
    });

    await newOrder.save();
    res.json({
      success: true,
      message: "Order successfully ",
      order: newOrder
    })
  }catch(error){
    console.log(error);
    res.status(500).json({
      success: false,
      message: "server error"
    });
  }
}


const updateProduct = async (req,res) => {
  // step 1 : check incomming data
  console.log(req.body);
  console.log(req.files);

  // destructuring data
  const {
      productName,
      productPrice,
      // productDescription,
      productCategory
  } = req.body;
  const {productImage} = req.files;

  // validate data
  if( !productName 
      || !productPrice 
      // || !productDescription 
      || !productCategory){
      return res.json({
          success : false,
          message : "Required fields are missing!"
      })
  }

  try {
      // case 1 : if there is image
      if(productImage){
          // upload image to cloudinary
          const uploadedImage = await cloudinary.v2.uploader.upload(
              productImage.path,
              {
                  folder : "products",
                  crop : "scale"
              }
          )

          // make updated json data
          const updatedData = {
              productName : productName,
              productPrice : productPrice,
              // productDescription : productDescription,
              productCategory : productCategory,
              productImageUrl : uploadedImage.secure_url
          }

          // find product and update
          const productId = req.params.id;
          await Products.findByIdAndUpdate(productId, updatedData)
          res.json({
              success : true,
              message : "Product updated successfully with Image!",
              updatedProduct : updatedData
          })

      } else {
          // update without image
          const updatedData = {
              productName : productName,
              productPrice : productPrice,
              // productDescription : productDescription,
              productCategory : productCategory,
          }

          // find product and update
          const productId = req.params.id;
          await Products.findByIdAndUpdate(productId, updatedData)
          res.json({
              success : true,
              message : "Product updated successfully without Image!",
              updatedProduct : updatedData
          })
      }
      
  } catch (error) {
      res.status(500).json({  
          success : false,
          message : "Internal server error"
      })
  }
}
const searchProductByName = async (req, res) => {
  try {
    const { productName } = req.query;

    // Perform case-insensitive search for products containing the given name
    const products = await Products.find({
      productName: { $regex: productName, $options: "i" },
    });

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No product found with the given name",
      });
    }

    res.json({
      success: true,
      message: "Products fetched successfully",
      products: products,
    });
  } catch (error) {
    console.error(`Error searching products by name: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


    const deleteProduct = async (req, res) => {
        try {
            const deleteProduct = await Products.findByIdAndDelete(req.params.id);
            if(!deleteProduct){
                return res.json({
                    success: false,
                    message: "Product not found"
                })
            }
            res.json({
                success: true,
                message: "Product deleted Sucesfully"
            })

        }catch (error){
            console.log(error);
            res.status(500).json({
                success: false,
                message : "server error"
            })
        }
    }


 module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createOrder,
  searchProductByName
  
}