import { ApiClient } from "@/customFetch/ApiClient";
import { getCookie } from "@/lib/utils";

class AuthService {
    name: any = 'user'

    async register(reqObj: any) {
        let url = `/${this.name}/register`
        return new Promise(async (resolve, reject) => {
            ApiClient.post(url, reqObj).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })

    }

    async login(reqObj: any) {
        let url = `/${this.name}/login`
        return new Promise(async (resolve, reject) => {
            ApiClient.post(url, reqObj).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })

    }


    async forgotPassword(reqObj: any) {
        let url = `/${this.name}/forgot-password`
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
        let url = `/${this.name}/reset-password?t=${token}`
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
    async me() {
        let url = `/${this.name}/me`
        return new Promise(async (resolve, reject) => {
            ApiClient.get(url).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })

    }

    async updateUserProfile(reqObj: any) {
        let url = `/user/${reqObj._id}`
        return new Promise(async (resolve, reject) => {
            ApiClient.put(url, reqObj).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })

    }

    async uploadUserImage(form: any) {
        let userName = getCookie('_un')
        let url = `/image/${userName}`
        return new Promise(async (resolve, reject) => {
            ApiClient.put(url, form).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })

    }

}

export default AuthService;
