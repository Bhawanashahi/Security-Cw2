const PetProducts = require('../model/petProductModel');
const cloudinary = require('cloudinary');


const createPetProduct = async (req,res) =>{
    // step 1 : Check incomming data
    console.log(req.body);
    console.log(req.files);

    // step:2 destructuring
    const {petProductName, 
        petProductPrice, 
        // productDescription, 
        } = req.body;

    const {petProductImage} = req.files;

    // step 3 : validate the data
    if(!petProductName || !petProductPrice ||  !petProductImage){
        return res.json({
            success : false,
            message : "Please fill all the fields."
        })
    }

        // step 4 : try catch block
        try {
            // step 5 : upload image to cloudinary
            const uploadedImage = await cloudinary.v2.uploader.upload(
              petProductImage.path,
                {
                    folder : "petproducts",
                    crop : "scale"
                }
            )
    
            // save the products
            const newPetProduct = new  PetProducts({
              petProductName : petProductName,
              petProductPrice : petProductPrice,
                // productDescription : productDescription,
                // productCategory : productCategory,
                petProductImageUrl : uploadedImage.secure_url
            })
            await newPetProduct.save();
            res.status(200).json({
                success : true,
                message : "Pet Product created successfully",
                data : newPetProduct
            })
    
            
        } catch (error) {
            console.log(error);
            res.status(500).json("Server Error")
        }

}


//function for getting all the product
const getAllPetProducts = async (req, res) => {
  try{
      const listOfPetProducts =  await  PetProducts.find();
      res.json({
          success: true,
          message: "Pet Product fetched successfully",
          products : listOfPetProducts
      })

  }catch(error){
      res.status(500).json("Server Error")

  }
}

// get product by id
const getSinglePetProduct = async (req ,res)=>{
  const id=req.params.id;
  if(!id) {return res.json(
  {
   message: 'No record with given id:',
   success:false,
  }
    )
  }
    try{
      const singlePetProduct = await  PetProducts.findById(id);
      res.json({
        success:true,
        message: 'Pet Product Fetched',
        product: singlePetProduct,
      })
    }catch(error){
      console.log(error);
      res.status(500).json('Server Error')
    }
}
//Create order 
const createPetOrder = async (req, res) => {
  console.log(req.body);
  const{userId , petProductId , quantity} = req.body;
  if(!userId || !petProductId || !quantity){
    return res.json({
      success: false,
      message : "All field are required"
    })
  }
  try {
    const newOrder = new Orders({
      userId : userId,
      petProductId: petProductId,
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


const updatePetProduct = async (req,res)=>{
     // step 1 : Check incomming data
     console.log(req.body);
     console.log(req.files);
 
     // step 2 : destructuring
     const {petProductName, 
      petProductPrice, 
        //  productDescription, 
         } = req.body;
 
     const {petProductImage} = req.files;
    //  destructure id from url
    const id = req.params.id;
    //  step 3 : validating
    if (!petProductName || !petProductPrice)
     {
      res.json(
        {
          success: false,
          message:'Please fill all fields'
        });
      }
      try{
        if(petProductImage){
          let uploadedImage = await cloudinary.v2.uploader.upload(
            petProductImage.path,
            {
              folder:'petproducts',
              crop:'scale'
            }
            );
            // update the product
            const updatedProduct= {
              petProductName:petProductName,
              petProductPrice:petProductPrice,
              // productDescription:productDescription,
            //   productCategory:productCategory,
            petProductImageUrl:uploadedImage.secure_url
            }
            await PetProducts.findByIdAndUpdate(id,updatedPetProduct);
            res.json({
              success:true,
              message:"Updated Successfully",
              petproduct:updatedPetProduct
            })
        } else{
          const updatedPetProduct= {
            petProductName:petProductName,
            petProductPrice:petProductPrice,
            // productDescription:productDescription,
            // productCategory:productCategory,
          }
          await PetProducts.findByIdAndUpdate(id,updatedPetProduct);
          res.json({
            success:true,
            message:"Updated Successfully Without Image",
            petproduct:updatedPetProduct
          })
        }
      }catch(error){
        console.log(error)
        res.status(500).json(
          {
            success:false,
            message:'Server Error'
          }
        )
     }
    }
    
    const deletePetProduct = async (req, res) => {
        try {
            const deletePetProduct = await PetProducts.findByIdAndDelete(req.params.id);
            if(!deletePetProduct){
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
  createPetProduct,
  getAllPetProducts,
  getSinglePetProduct,
  updatePetProduct,
  deletePetProduct,
  createPetOrder,
  
}