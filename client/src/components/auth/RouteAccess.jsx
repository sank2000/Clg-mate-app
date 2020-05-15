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

export {
    signin, signup, hasSigned, signout,checkId,sendMail
}
