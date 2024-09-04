import { Decrypt, Encrypt } from "./encryption";

const SECRET_CODE = "msme9869"

export const setData = (key, data) => {
    const encrypted = Encrypt(data, SECRET_CODE)
    sessionStorage.setItem(key, encrypted)
}

export const getData = (key) => {
    const data = sessionStorage.getItem(key)
    if (!data) return null
    return Decrypt(data, SECRET_CODE)
}