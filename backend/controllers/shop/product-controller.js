import productModels from '../../models/product.models.js';

export const getProductShop = async (req, res) => {
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

export const getAllProductsShop = async (req, res) => {
    try {
        const products = await productModels.find({});
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `Server Error in getAllProducts - ${error} `});
    }
};