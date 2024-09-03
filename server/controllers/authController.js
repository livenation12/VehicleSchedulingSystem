import UserService from "../services/userService.js"
import jwt from 'jsonwebtoken'
import ValidationError from "./errorHandler.js"


export const create = async (req, res) => {
          try {
                    const newUser = await UserService.createNewUser(req.body);
                    res.status(201).json(newUser)
          } catch (error) {
                    res.status(400).json(error)
          }
}

const createToken = (user) => {
          return jwt.sign({ user, isUser: true, }, process.env.SECRET_KEY, { expiresIn: '1d' })
}

const defaultCookieOptions = {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
}
export const login = async (req, res) => {
          try {
                    const user = await UserService.validateLogin(req.body)
                    if (user) {
                              const token = createToken({ user: user._id, email: user.email })
                              console.log(user)
                              res.cookie('authToken', token, defaultCookieOptions)
                              res.status(200).json({ success: true, data: { user: user._id, email: user.email } })
                    } else {
                              res.status(400).json(new ValidationError('Invalid credentials', 'email', 400));
                    }
          } catch (error) {
                    res.status(400).json(error)
          }
}

export const logout = (req, res) => {
          res.cookie('authToken', '', { maxAge: 1 });
          res.json({ success: true })
}

export const verifyUserToken = (req, res) => {
          const token = req.cookies.authToken
          if (!token) {
                    return res.status(401).json({ error: "Unauthorized access. Please log in." });
          }
          try {
                    const decoded = jwt.verify(token, process.env.SECRET_KEY);
                    res.status(200).json(decoded);
          } catch (error) {
                    res.status(401).json({ error: "Invalid or expired token. Please log in again." });
          }
}