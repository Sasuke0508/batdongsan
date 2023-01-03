import api from "../store/api";
import { validator } from "../utils";

const accountRule = [
    {
        name: 'email',
        rules: [
            {
                name: 'notNull',
                message: 'Email is required'
            }
        ]
    },
    {
        name: 'username',
        rules: [
            {
                name: 'notNull',
                message: 'Username is required'
            },
            {
                name: 'minLength',
                message: 'Username must be at least 6 characters',
                param: [6]
            }
        ]
    },
    {
        name: 'password',
        rules: [
            {
                name: 'notNull',
                message: 'Password is required'
            },
            {
                name: 'minLength',
                message: 'Password must be at least 8 character',
                param: [8]
            }
        ]
    },
    {
        name: 'rePassword',
        rules: [
            {
                name: 'notNull',
                message: 'Re-Password is required'
            },
            {
                name: 'minLength',
                message: 'Password must be at least 8 character',
                param: [8]
            },
            {
                message: 'Password and Re-Password not match',
                customFunc: (data) => {
                    return data.password !== data.rePassword;
                }
            }
        ]
    }
]

const accountService = {
    register: async (account) => {
        validator.validate(account, accountRule);
        return await api.post(account, '/auth/signup');
    },

    verifyEmail: async (email) => {
        if (!validator.notNull(email)) 
            throw new Error('Email is required');

        return await api.post({email}, '/auth/verify_email');
    },
}

export default accountService;