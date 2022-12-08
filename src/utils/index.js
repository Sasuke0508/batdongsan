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
