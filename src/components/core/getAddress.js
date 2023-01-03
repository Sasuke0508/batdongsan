import { addressData } from "../../constants";

function getAddress(get, city, district) {
    let result = [];
    if (get == "city") {
        result = addressData.map((item) => ({ value: item.Id, label: item.Name }));
    }
    if (get == "district") {
        const districts = addressData.find((item) => item.Id == city).Districts;
        result = districts.map((item) => ({
            value: item.Id,
            label: item.Name,
        }));
    }
    if (get == "ward") {
        const districts = addressData.find((item) => item.Id == city).Districts;
        const wards = districts.find((item) => item.Id == district).Wards;
        result = wards.map((item) => ({
            value: item.Id,
            label: item.Name,
        }));
    }
    return result;
}

export default getAddress;

export const getAddressLabel = (address) => {
    const { city, district, ward, number } = address;
    const cityLabel = getAddress("city").find((item) => item.value == city)?.label;
    const districtLabel = city ? getAddress("district", city).find((item) => item.value == district)?.label : "";
    const wardLabel = city && district ? getAddress("ward", city, district).find((item) => item.value == ward)?.label : "";
    const result = {
        city: cityLabel || "",
        district: districtLabel || "",
        ward: wardLabel || "",
        number: number || "",
    };
    return result;
};

export const getAddressLabelText = (address) => {
    const addressLabelObject = getAddressLabel(address);
    const array = Object.values(addressLabelObject);
    return (
        array
            .filter((item) => item !== "")
            .reverse()
            .join(", ") || "Trên toàn quốc"
    );
};
