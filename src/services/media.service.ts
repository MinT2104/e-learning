import { ApiClient } from "@/customFetch/ApiClient"

class MediaService {

    name: any
    constructor(name: string) {
        this.name = name
    }

    async uploadImage(form: any) {
        const url = `/${this.name}/upload`
        return new Promise(async (resolve, reject) => {
            ApiClient.post(url, form).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })

    }

    async uploadVideo(form: any) {
        const url = `/media/upload-video`
        return new Promise(async (resolve, reject) => {
            ApiClient.post(url, form).then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        })
    }

}

export default MediaService;
