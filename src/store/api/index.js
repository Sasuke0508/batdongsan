import axios from "axios";
import config from "../../config";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    async get(data, enpoint = "") {
        return await axios
            .get(`${config.rootLinkAPI}/${enpoint}`, {
                params: data,
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    async post(data, enpoint = "") {
        if (data.type === "form") {
            const formData = new FormData();
            formData.append("data", JSON.stringify(data));
            return await axios
                .post(`${config.rootLinkAPI}/${enpoint}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        return await axios.post(`${config.rootLinkAPI}/${enpoint}`, data).catch(function (error) {
            console.log("Show Error: ", error);
        });
    },
};
