import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

//reg
export const register = async (req, res) => {
    const { name, email, password, lastName } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({
                success: false,
                message: 'User already exists',
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            lastName
        })
        await newUser.save();
        
        const token = jwt.sign({ id: newUser._id, role: newUser.role, name: newUser.name, email: newUser.email, lastName: newUser.lastName }, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            message: 'User created successfully',
        });

    }catch (error) {
        console.error(error);
        res.json({ 
            success: false,
            message: 'Internal server error'
         });
    }
};

//log
export const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.json({
            success: false,
            message: 'Please enter email and password',
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: 'User not found, please try again',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: 'Invalid credentials, please try again',
            });
        };

        const token = jwt.sign({id: user._id, role: user.role, name: user.name, email: user.email, lastName: user.lastName}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                role: user.role,
                name: user.name
            }
        });

    }catch (error) {
        console.error(error);
    }
};

export const logout = async (req, res) => {
   try {
    res.clearCookie('token',{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });
    res.json({
        success: true,
        message: 'Logout successful',
    });
   } catch (error) {
    console.error(error);
    res.json({ 
        success: false,
        message: 'Internal server error'
     });
   }
};

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.json({
                success: false,
                message: 'Unauthorized',
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.json({ 
            success: false,
            message: 'Internal server error'
         });
    }
};
