const Joi = require('joi');

const signUpValidation = {
    body: Joi.object().required().keys({
        userName: Joi.string().required(),
        email: Joi.string().required().email().messages({
            'string.empty': 'you must add an email',
            'string.email': 'you must add a valid email',
        }),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cPassword: Joi.ref('password'),
        phone: Joi.string().required(),
        location: Joi.string().required()
    })
};

const signInValidation = {
    body: Joi.object().required().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })
};

const updateProfileValidation = {
    body: Joi.object().required().keys({
        userName: Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.string().required(),
        location: Joi.string().required()
    })
};

const updatePasswordValidation = {
    body: Joi.object().required().keys({
        oldPassword: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        newPassword: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        cNewPassword: Joi.ref('newPassword')
    })
};

const forgetPasswordValidation = {
    body: Joi.object().required().keys({
        email: Joi.string().required().email()
    })
};

const sendConfirmationEmailValidation = {
    body: Joi.object().required().keys({
        email: Joi.string().required().email()
    })
};

const deletePostValidation = {
    body: Joi.object().required().keys({
        postId: Joi.string().required().min(24).max(24)
    })
}

// const paginationValidation = {
//     query: Joi.object().required().keys({
//         page: Joi.number().required(),
//         limit: Joi.number().required()
//     })
// }

// const adminIdValidation = {
//     params: Joi.object().required().keys({
//         adminId: Joi.string().required().min(24).max(24)
//     })
// }
const createPostValidation = {
    body: Joi.object().required().keys({
        title: Joi.string().required(),
        desc: Joi.string().required()
    })
}

const editPostValidation = {
    body: Joi.object().required().keys({
        title: Joi.string().required(),
        desc: Joi.string().required(),
        postId: Joi.string().required().min(24).max(24)
    })
}

const deletePostValidation = {
    body: Joi.object().required().keys({
        postId: Joi.string().required().min(24).max(24),
    })
}

const getUserProfilePostsValidation = {
    body: Joi.object().required().keys({
        userId: Joi.string().required().min(24).max(24),
    })
}

const paginationValidation = {
    query: Joi.object().required().keys({
        page: Joi.number().required(),
        limit: Joi.number().required()
    })
}

module.exports = {
    signUpValidation,
    signInValidation,
    updateProfileValidation,
    updatePasswordValidation,
    forgetPasswordValidation,
    sendConfirmationEmailValidation,
    deletePostValidation
}
