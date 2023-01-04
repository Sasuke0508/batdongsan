// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCOql3yZoOrjvFJi3dHml-4-c5mMjSn5Hg",
    authDomain: "findroom-373109.firebaseapp.com",
    projectId: "findroom-373109",
    storageBucket: "findroom-373109.appspot.com",
    messagingSenderId: "783269658664",
    appId: "1:783269658664:web:25c55277eff406c6e0f51d",
    measurementId: "G-NDEECMC1W8",
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
