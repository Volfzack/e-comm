import express from "express";
import {addProduct, getProduct, updateProduct, getAllProducts, deleteProduct, getProductsByCategory} from "../../controllers/productController.js";
import  upload  from "../../configs/multer.js";

const productRouter = express.Router();

productRouter.post('/add', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct);
productRouter.get('/get/:id', getProduct);
productRouter.put('/update/:id', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), updateProduct);
productRouter.get('/all', getAllProducts);
productRouter.delete('/delete/:id', deleteProduct);
productRouter.get('/category/:category', getProductsByCategory);


export default productRouter;