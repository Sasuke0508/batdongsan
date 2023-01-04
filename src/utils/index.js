import Swal from 'sweetalert2';
import getAddress from '../components/core/getAddress';
import { sellTypes } from '../constants';

export { default as validator } from './validator';

export const removeAccents = (str) => {
    var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ",
        "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ",
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return str;
};

export const convertInputTextToObject = (text) => {
    const formatText = removeAccents(text);
    const textArray = formatText.split(" ");
    const textArrayLowerCase = textArray.map((item) => item.toLowerCase());
    const textValue = textArrayLowerCase.join("_");
    return {
        label: text,
        value: textValue,
    };
};

export const checkArrayHasItem = (value, array, dept1 = null, dept2 = null) => {
    if (dept2) {
        return array.find((item) => item[dept1][dept2] === value);
    }
    if (dept1) {
        return array.find((item) => item[dept1] === value);
    }
    return array.find((item) => item === value);
};

export const formatCurrency = (curr) => {
    const string = String(curr);
    let result = "";
    for (let i = string.length - 1; i >= 0; i--) {
        result = string[i] + result;
        if ((string.length - i) % 3 === 0 && i !== 0) {
            result = "." + result;
        }
    }
    return result;
};

export const countUnreadNoti = (list) => {
    const length = list.filter(item => !item.is_read).length 
    return length > 9 ? '9+' : length
} 

export const RequiredMark = () => <span style={{ color: "red" }}>*</span>;

export function getLabelName(_value) {
    return sellTypes.find(type => type.value === _value)?.label || '';
}

export async function getAddressName(address) {
    const cityPromise = new Promise((resolve, reject) => {
        const cityList = getAddress("city");
        const { label: city } = cityList.find(c => c.value === address.city);
        resolve(city);
    })

    const districtPromise = new Promise((resolve, reject) => {
        const districtList = getAddress("district", address.city);
        const { label: district } = districtList.find(d => d.value === address.district);
        resolve(district);
    })

    const wardPromise = new Promise((resolve, reject) => {
        const wardList = getAddress("ward", address.city, address.district);
        const { label: ward } = wardList.find(w => w.value === address.ward);
        resolve(ward);
    })

    const [province, district, ward] = await Promise.all([cityPromise, districtPromise, wardPromise]);
    return {province, district, ward};
}

export function join(array, delimiter) {
    if (!array?.length) return null;
    return array.join(delimiter);
}

export const msgPendingFeature = () => {
    Swal.fire("", "Tính năng đang phát triển!");
};