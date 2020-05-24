import axios from "axios";

const signin = async (user) => {
    let prms = new URLSearchParams(user);
    const result = await axios.post("/auth/signin", prms);
    return result;
}

const signup = async (user) => {
    let prms = new URLSearchParams(user);
    const result = await axios.post("/auth/signup", prms);
    return result;
}

const hasSigned = async () => {
    const result = await axios.get("/auth");
    return result;
}

const signout = async () => {
    const result = await axios.get("/auth/signout");
    return result;
}

const checkId = async (body) => {
    let prms = new URLSearchParams(body);
    const result = await axios.post("/mail/forgot", prms);
    return result;
}
const sendMail = async (body) => {
    let prms = new URLSearchParams(body);
    const result = await axios.post("/mail/forgot/sendmail", prms);
    return result;
}

const verifyOTP = async (body) => {
    let prms = new URLSearchParams(body);
    const result = await axios.post("/mail/forgot/verify", prms);
    return result;
}

const resetPassword = async (body) => {
    let prms = new URLSearchParams(body);
    const result = await axios.post("/mail/forgot/reset", prms);
    return result;
}

const changePassword = async (body) => {
    let prms = new URLSearchParams(body);
    const result = await axios.post("/auth/updatePassword", prms);
    return result;
}

const updateAccount = async (body) => {
    let prms = new URLSearchParams(body);
    const result = await axios.post("/auth/update", prms);
    return result;
}
const deleteAccount = async () => {
    const result = await axios.get("/auth/delete");
    return result;
}

export {
    signin, signup, hasSigned, signout,checkId,sendMail,verifyOTP,resetPassword,changePassword,updateAccount,deleteAccount
}
