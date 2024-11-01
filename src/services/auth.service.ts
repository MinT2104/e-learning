import { ApiClient } from "@/customFetch/ApiClient";
import { deleteCookie, getCookie } from "@/lib/utils";

class AuthService {
    name: any

    constructor(name: string) {
        this.name = name
    }

    async register(reqObj: any) {
        const url = `/${this.name}/register`
        return new Promise(async (resolve, reject) => {
            ApiClient.post(url, reqObj).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })

    }

    async login(reqObj: any) {
        const url = `/${this.name}/login`
        return new Promise(async (resolve, reject) => {
            ApiClient.post(url, reqObj).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })

    }


    async forgotPassword(reqObj: any) {
        const url = `/${this.name}/forgot-password`
        return new Promise(async (resolve, reject) => {
            ApiClient.post(url, reqObj).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })

    }
    async resetPassword(reqObj: any) {
        const { token } = reqObj
        delete reqObj.token
        const url = `/${this.name}/reset-password?t=${token}`
        return new Promise(async (resolve, reject) => {
            ApiClient.post(url, reqObj.password, {
                headers: {
                    "Content-Type": 'text/plain'
                }
            }).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })

    }

    async logOut() {

        return new Promise(async (resolve) => {
            resolve('Đăng xuất thành công')
        })
    }

    async me() {
        const url = `/${this.name}/me`
        return new Promise(async (resolve, reject) => {
            ApiClient.get(url).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })

    }

    async updateUserProfile(reqObj: any) {
        const url = `/user/${reqObj._id}`
        return new Promise(async (resolve, reject) => {
            ApiClient.put(url, reqObj).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })

    }

    async uploadUserImage(form: any) {
        const userName = getCookie('_un')
        const url = `/image/${userName}`
        return new Promise(async (resolve, reject) => {
            ApiClient.put(url, form).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })

    }
    async completeRegisteration(reqObj: any) {
        const url = `/${this.name}/complete-registeration`
        return new Promise(async (resolve, reject) => {
            ApiClient.post(url, reqObj).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })

    }



}

export default AuthService;
