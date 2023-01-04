import api from "../store/api";
import { validator } from "../utils";

const userService = {
    
    updateUserInfo: async (updateUserInfo) => {
        validator.validate(updateUserInfo, []);
        return await api.post(updateUserInfo, '/user/change_info');
    }
}

export default userService;