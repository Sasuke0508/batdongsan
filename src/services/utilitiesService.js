import api from "../store/api";

const utilitiesService = {

    findAll: async () => {
        return await api.get({}, '/utilities')
    }
}

export default utilitiesService;