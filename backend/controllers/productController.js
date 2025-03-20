import productModels from '../models/product.models.js';
import cloudinary from '../configs/cloudinary.js';


const addProduct =  async (req, res) => {
    const { title, description, price, salePrice, characteristics, quantity, category } = req.body;

    try {   
        
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const files = [image1, image2, image3, image4].filter((item) => item !== undefined && item !== null);

        let imagesUrl = await Promise.all(
            files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: 'auto',
                });
                return result.secure_url;
            })
        )

        const productData = {
            title,
            description,
            price,
            salePrice,
            category,
            quantity,
            characteristics,
            images: imagesUrl

        };

        const product = new productModels(productData);
        await product.save();
        
        res.status(201).json({ success: true, message: 'Product added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `Server Error in addProduct - ${error} `});
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await productModels.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `Server Error in getProduct - ${error} `});
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productModels.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `Server Error in getAllProducts - ${error} `});
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await productModels.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const files = [image1, image2, image3, image4].filter((item) => item !== undefined && item !== null);


        let imagesUrl = await Promise.all(
            files.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, {
                    resource_type: 'auto',
                });
                return result.secure_url;
            })
        )
        const { title, description, price, salePrice, characteristics, category, quantity } = req.body;

        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.salePrice = salePrice || product.salePrice;
        product.category = category || product.category;
        product.quantity = quantity || product.quantity;
        product.characteristics = characteristics || product.characteristics;
        product.images = imagesUrl.length > 0 ? imagesUrl : product.images;
      
        
        

        await product.save();

        res.json({ success: true, message: 'Product updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `Server Error in updateProduct - ${error} `});
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const products = await productModels.find({ category: req.params.category });
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `Server Error in getProductsByCategory - ${error} `});
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await productModels.findByIdAndDelete(req.params.id);
       if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `Server Error in deleteProduct - ${error} `});
    }
};

export { addProduct, getProduct, getAllProducts, updateProduct, deleteProduct, getProductsByCategory };