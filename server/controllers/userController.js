import User from "../models/userModel.js";
import bcrypt from 'bcrypt'

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        const { password: _, ...userWithoutPassword } = user._doc;

        req.session.regenerate((err) => {
            if (err) {
                return res.status(500).json({ message: "Session error", error: err });
            }
            req.session.user = user._id;
            res.status(201).json({ message: "User registered successfully", user: userWithoutPassword });
        });


    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }

};

export const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const { password: _, ...userWithoutPassword } = user._doc;
                req.session.regenerate((err) => {
                    if (err) {
                        return res.status(500).json({ message: "Session error", error: err });
                    }
                    req.session.user = user._id;
                    res.status(200).json({ message: "User signed in successfully", user: userWithoutPassword });
                });
            } else {
                res.status(401).json({ message: "Invalid email or password" });
            }
        } else {
            res.status(401).json({ message: "User does not exist" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getCurrentUser = (req, res) => {
    res.json({ user: req.session.user });
};

export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout Failed", error: err });
        }
        res.clearCookie("sessionId", {
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        res.status(200).json({ message: "User logged out successfully" });
    });
};