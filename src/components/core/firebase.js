// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATyRHDTAaLvYVnnIS9KRSDhHFWzNdt7b8",
    authDomain: "batdongsan-370317.firebaseapp.com",
    projectId: "batdongsan-370317",
    storageBucket: "batdongsan-370317.appspot.com",
    messagingSenderId: "126021146171",
    appId: "1:126021146171:web:0a59c0ec6a0c788a602e1e",
    measurementId: "G-367TDBQ23E",
    databaseURL: "https://batdongsan-370317-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const storageRef = ref(storage, "image");
export const uploadImage = async (file) => {
    const randomString = new Date().getTime();
    const fileNamePrefix = file.name.split(".")[0];
    const fileRef = ref(storage, `image/image_${fileNamePrefix}_${randomString}`);
    const metadata = {
        contentType: file.type,
    };
    const result = await uploadBytes(fileRef, file, metadata);
    const url = await getDownloadURL(result.ref);
    return url;
};
