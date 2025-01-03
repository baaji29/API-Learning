import { checkSchema } from "express-validator";
import { message } from "../Config/ValidationsMessage.mjs";

export const UserValidation =checkSchema({
    email: {
        isEmail: {
            errorMessage: message.emailFormat
        },
        notEmpty: {
            errorMessage : message.emailRequired
        },
    },
    name: {
        isLength: {
            options: {
                min: 3,
                max: 18,
            },
            errorMessage: message.nameLength,
        },
        notEmpty: {
            errorMessage: message.nameRequired,
        },
        isString: {
            errorMessage: message.nameString,
        },
    },
    password: {
        notEmpty: {
            errorMessage: message.pa
        }
    },
});