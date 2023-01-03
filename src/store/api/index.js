import axios from 'axios';
import config from '../../config';

const instance = axios.create({
    baseURL: config.rootLinkAPI,
});

instance.interceptors.response.use(res => {
    return res.data;
})

export { instance };

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    async get(data, enpoint = "") {
        return await instance
            .get(enpoint, {
                params: data,
            })
            .catch(function (error) {
                throw new Error(error?.response?.data?.message || 'Có lỗi xảy ra trong quá trình xủ lý.')
            });
    },

    async post(data, enpoint = '') {
        if (data.type === 'form') {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data))
            return await instance
                .post(enpoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        return await instance
            .post(enpoint, data)
            .catch(function (error) {
                throw new Error(error?.response?.data?.message || 'Có lỗi xảy ra trong quá trình xủ lý.')
            });
    },
    async patch(data, endpoint) {
        return await instance
            .patch(endpoint, data)
            .catch(function (error) {
                throw new Error(error?.response?.data?.message || 'Có lỗi xảy ra trong quá trình xủ lý.')
            });
    },
    async put(data, endpoint) {
        return await instance
        .put(endpoint, data)
        .catch(function (error) {
            throw new Error(error?.response?.data?.message || 'Có lỗi xảy ra trong quá trình xủ lý.')
        });
    }
}