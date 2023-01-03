import api from "../store/api";

const postTypeService = {

    findAll: async () => {
        return await api.get({}, '/post-types')
    }
}

export default postTypeService;