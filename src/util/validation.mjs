export const UserValidation ={
    name: {
        isLength: {
            options: {
                min: 3,
                max: 18,
            },
            errorMessage: "Must have minimum 3 char and Maximum 218 character",
        },
        notEmpty: {
            errorMessage: "Name should not be Empty",
        },
        isString: {
            errorMessage: "Name should be string",
        },
    },
    gender: {
        notEmpty: true
    }
};