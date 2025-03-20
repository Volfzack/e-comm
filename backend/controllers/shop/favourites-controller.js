import Favourites from "../../models/favourite.products.models.js";
import productModel from "../../models/product.models.js";

export const addFavouriteItem = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let favourite = await Favourites.findOne({ userId });

    if (!favourite) {
       favourite = new Favourites({ userId, items: [] });
    }


      const findCurrentProductIndex = favourite.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (findCurrentProductIndex !== -1) {
        return res.status(400).json({
          success: false,
          message: "Product already added to favourites",
        });
      }

      favourite.items.push({ productId: productId });
      await favourite.save();

      return res.status(200).json({
        success: true,
        message: "Product added to favourites successfully",
      });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Server Error in addFavouriteItem - ${error}`,
    });
  }
};

export const fetchFavouriteItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const favourite = await Favourites.findOne({ userId }).populate({
      path: "items.productId",
      select: "images title price salePrice category quantity",
    });

    if (!favourite) {
      return res.status(404).json({
        success: false,
        message: "Favourites not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Favourites fetched successfully",
      data: favourite,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: `Server Error in getFavouriteItems - ${error}`,
    });
  }
};


export const deleteFavouriteItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
      if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!",
        });
      }
  
      const favourite = await Favourites.findOne({ userId }).populate({
        path: "items.productId",
        select: "images title price salePrice category quantity",
      });
  
      if (!favourite) {
        return res.status(404).json({
          success: false,
          message: "Wishlist not found!",
        });
      }
  
      favourite.items = favourite.items.filter(
        (item) => item.productId._id.toString() !== productId
      );
  
      await favourite.save();
  
      await favourite.populate({
        path: "items.productId",
        select: "images title price salePrice category quantity",
      });
  
      const populateCartItems = favourite.items.map((item) => ({
        productId: item.productId ? item.productId._id : null,
        images: item.productId ? item.productId.images : null,
        title: item.productId ? item.productId.title : "Product not found",
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        category: item.productId ? item.productId.category : null,
        quantity: item.productId ? item.productId.quantity : null,
      }));
  
      res.status(200).json({
        success: true,
        data: {
          ...favourite._doc,
          items: populateCartItems,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error",
      });
    }
};
