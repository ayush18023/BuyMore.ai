import axios from 'axios'
const URL = 'http://localhost:8000'
export const authenticateSignup = async (data) => {
    try {
        const reply = await axios.post(`${URL}/signup`, data)
        return reply
    }
    catch (err) {
        // console.log(err)
        return err
    }
}
export const authenticateLogin = async (data) => {
    try {
        const reply = await axios.post(`${URL}/login`, data)
        // console.log(reply)
        return reply
    }
    catch (err) {
        // console.log(err)
        return err
    }
}
export const payUsingPaytm = async (data) => {
    try {
        const response = await axios.post(`${URL}/payment`, data)
        return response.data
    }
    catch (err) {
        console.log(err)
    }
}