import { ApiClient } from "@/customFetch/ApiClient"

class MediaService {

    name: string = 'media'

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
    
}

export default MediaService;
