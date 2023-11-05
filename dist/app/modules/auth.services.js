"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserServices = void 0;
const config_1 = __importDefault(require("../../config"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const jwtHelpers_1 = require("../../shared/jwtHelpers");
const auth_models_1 = require("./auth.models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: config_1.default.my_email,
        pass: config_1.default.my_password,
    },
});
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    payload.password = yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds));
    const createSecret = yield jwtHelpers_1.JwtHelpers.createToken({ email: payload.email }, config_1.default.jwt.verify_secret, config_1.default.jwt.verify_email_expire);
    const isExistUser = yield auth_models_1.User.findOne({
        email: payload.email,
        phoneNo: payload.phoneNo,
    });
    if (isExistUser) {
        const mailOptions = {
            from: config_1.default.my_email,
            to: payload.email,
            subject: "verify your email",
            html: `
    <P>Hello ${payload.name}, please verify your email</p>
    <a href="https://stupendous-syrniki-758b36.netlify.app/verify/${createSecret}/" target="_blank">Click here to verify your email</a>`,
        };
        const result = yield transporter.sendMail(mailOptions);
        return result;
    }
    else {
        yield auth_models_1.User.create(payload);
        const mailOptions = {
            from: config_1.default.my_email,
            to: payload.email,
            subject: "verify your email",
            html: `
    <P>Hello ${payload.name}, please verify your email</p>
    <a href="http://localhost:3000/verify/${createSecret}/" target="_blank">Click here to verify your email</a>`,
        };
        const result = yield transporter.sendMail(mailOptions);
        console.log({ createSecret });
        return result;
    }
});
const LogIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield auth_models_1.User.findOne({ email: payload.email });
    if (!isUserExist) {
        throw new apiError_1.default(404, "user doesn't exist");
    }
    if (!isUserExist.isVerified) {
        throw new apiError_1.default(401, "please verify your email first, then try to login");
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new apiError_1.default(401, "something went wrong");
    }
    const accessToken = yield jwtHelpers_1.JwtHelpers.createToken({
        userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
    }, config_1.default.jwt.access_secret, config_1.default.jwt.access_expire);
    return {
        isVerified: isUserExist.isVerified,
        userId: isUserExist._id.toString(),
        email: isUserExist.email,
        role: isUserExist.role,
        token: accessToken,
    };
});
const verifyEmailAndUpdateStatus = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyToken = yield jwtHelpers_1.JwtHelpers.verifyToken(token, config_1.default.jwt.verify_secret);
    if (!verifyToken || !verifyToken.email) {
        throw new apiError_1.default(401, "maybe your verification time is expired, please try again");
    }
    const email = verifyToken.email;
    const result = yield auth_models_1.User.findOneAndUpdate({ email }, { $set: { isVerified: true } });
    return result;
});
exports.AuthUserServices = {
    createUser,
    LogIn,
    verifyEmailAndUpdateStatus,
};
