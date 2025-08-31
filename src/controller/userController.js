const userModel = require('../models/userModel.js')
const bcrypt = require('bcryptjs')

// Controller đăng ký
async function registerUser(req, res) {
    const {username, password} = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'Vui lòng cung cấp tên người dùng và mật khẩu.' });
    }

    try {
        const existingUser = await userModel.findUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ message: 'Tên người dùng đã tồn tại.' });
        }
        const saltRounds = 10; 
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const success = await userModel.createUser(username, passwordHash)
        if (success) {
            res.status(201).json({ message: 'Đăng ký thành công!' })
        } else {
            res.status(500).json({ message: 'Đăng ký thất bại' })
        }
    } catch (error) {
        console.error('Error in controller registerUser:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi server khi đăng ký.', error: error.message });
    }
}

// Controller cho chức năng đăng nhập
async function loginUser(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Vui lòng cung cấp tên người dùng và mật khẩu.' });
    }

    try {
        const user = await userModel.findUserByUsername(username);


        if (!user || !(await bcrypt.compare(password, user.PasswordHash))) {
            return res.status(401).json({ message: 'Tên người dùng hoặc mật khẩu không đúng.' });
        }

        res.status(200).json({ 
            message: 'Đăng nhập thành công!',
            userId: user.Id,
            username: user.Username
        });

    } catch (error) {
        console.error('Error in controller loginUser:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi server khi đăng nhập.', error: error.message });
    }
}

module.exports = {
    registerUser,
    loginUser
};
