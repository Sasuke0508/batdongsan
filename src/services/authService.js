import api from "../store/api";
import { validator } from "../utils";

const loginRequestRule = [
    {
        name: 'username',
        rules: [
            {
                name: 'notNull',
                message: 'Username is required'
            }
        ]
    },
    {
        name: 'password',
        rules: [
            {
                name: 'notNull',
                message: 'Password is required',
            }
        ]
    }
]

const forgotPasswordRule = [
    {
        name: 'username',
        rules: [
            {
                name: 'notNull',
                message: 'Username is required'
            }
        ]
    },
    {
        name: 'newPassword',
        rules: [
            {
                name: 'notNull',
                message: 'New Password is required'
            },
            {
                name: 'minLength',
                message: 'New Password must be at least 8 characters',
                param: [8]
            },
        ]
    },
    {
        name: 'reNewPassword',
        rules: [
            {
                name: 'notNull',
                message: 'Re new password is required'
            },
            {
                name: 'minLength',
                message: 'New Password must be at least 8 characters',
                param: [8]
            },
            {
                customFunc: (data) => {
                    return data.reNewPassword !== data.newPassword;
                },
                message: 'Re new password not match'
            }
        ]
    }
]

const changePasswordRule = [
    {
        name: 'currentPassword',
        rules: [
            {
                name: 'notNull',
                message: 'Old password is required'
            },
            {
                name: 'minLength',
                message: 'Password must be at least 8 character',
                param: [8]
            }
        ]
    },
    {
        name: 'newPassword',
        rules: [
            {
                name: 'notNull',
                message: 'New password is required'
            },
            {
                name: 'minLength',
                message: 'Password must be at least 8 character',
                param: [8]
            }
        ]
    },
    {
        name: 'reNewPassword',
        rules: [
            {
                name: 'notNull',
                message: 'New password is required'
            },
            {
                name: 'minLength',
                message: 'Password must be at least 8 character',
                param: [8]
            },
            {
                customFunc: (data) => {
                    return data.newPassword !== data.reNewPassword;
                },
                message: 'Re new password not match',
            }
        ]
    }
]

const authService = {

    login: async (loginRequest) => {
        validator.validate(loginRequest, loginRequestRule);
        return await api.post(loginRequest, '/auth/signin');
    },

    changePassword: async (changePassword, isForgotPassword) => {
        validator.validate(changePassword, isForgotPassword ? forgotPasswordRule : changePasswordRule);
        return await api.post(changePassword, isForgotPassword ? '/auth/forgot_password' : '/account/change_password');
    }
}

export default authService;