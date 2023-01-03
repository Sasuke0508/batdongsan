import api from '../store/api';
import { validator } from '../utils';

const postRule = [
    {
        name: 'title',
        rules: [
            { 
                name: 'notNull', 
                message: 'Title is required'
            },
            {
                name: 'length',
                message: 'Title is invalid',
                param: [30, 99]
            }
        ]
    },
    {
        name: 'content',
        rules: [
            {
                name: 'notNull',
                message: 'Content is required',
            },
            {
                name: 'length',
                message: 'Content is invalid',
                param: [30, 3000]
            },
        ]
    },
    {
        name: 'areaSize',
        rules: [
            {
                name: 'notNull',
                message: 'Area size is required',
            },
            {
                name: 'size',
                message: 'Area size is invalid',
                param: [0, 999]
            }
        ]
    },
    {
        name: 'price',
        rules: [
            {
                name: 'notNull',
                message: 'Price is required',
            }
        ]
    },
    {
        name: 'imageUrls',
        rules: [
            {
                name: 'notNull',
                message: 'Image URLs are required',
            },
            {
                name: 'listSize',
                message: 'List size is invalid (at least 4 and maximum 16)',
                param: [4, 16]
            }
        ]

    }
];

const addressRule = [
    {
        name: 'addressDetail',
        rules: [
            {
                name: 'notNull',
                message: 'The address detail is required'
            }
        ]
    }
]

const contactInfoRule = [
    {
        name: 'fullName',
        rules: [
            {
                name: 'notNull',
                message: 'Full name is required',
            }
        ]
    },
    {
        name: 'phoneNumber1',
        rules: [
            {
                name: 'notNull',
                message: 'Phone number is required',
            }
        ]
    },
    {
        name: 'address',
        rules: [
            {
                name: 'notNull',
                message: 'Address is required',
            }
        ]
    },
    {
        name: 'email',
        rules: [
            {
                name: 'notNull',
                message: 'Email is required'
            }
        ]
    }
]

const postService = {
    createPost: async (post) => {
        validator.validate(post.address, addressRule);
        validator.validate(post.contactInformation, contactInfoRule);
        validator.validate(post, postRule);
        return await api.post({
            ...post,
            type: 'JSON',
        }, '/posts')
    },

    updatePost: async (id, post) => {
        validator.validate(post.address, addressRule);
        validator.validate(post.contactInformation, contactInfoRule);
        validator.validate(post, postRule);
        return await api.put(post, `/posts/${id}`)
    },
    findAll: async (pageCriteria, getPostRequest) => {
        return await api.get({
            ...pageCriteria,
            ...getPostRequest,
        }, '/posts')
    },
    like: async (postId) => {
        return await api.post({}, `/posts/${postId}/like`)
    },
    unLike: async (postId) => {
        return await api.post({}, `/posts/${postId}/unlike`)
    },
    findById: async (postId) => {
        return await api.get({}, `/posts/${postId}`);
    },
    topPost: async (limit) => {
        return await api.get({page: 1, limit}, '/posts/top-posts');
    },
    getMyPost: async (pageCriteria, getPostRequest) => {
        return await api.get({
            ...pageCriteria,
            ...getPostRequest,
        }, '/posts/my-posts')
    },
    changeStatus: async (id, status) => {
        return await api.patch({status}, `/posts/${id}/status`);
    },
    adjournPost: async (id, postTypeId) => {
        return await api.get({postType: postTypeId}, `/posts/${id}/adjourn-post`);
    },
    favouritePost: async (pageCriteria, getPostRequest) => {
        return await api.get({
            ...pageCriteria,
            ...getPostRequest,
        }, '/posts/favourite_post')
    }
}

export default postService;