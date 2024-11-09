// import { ApiClient } from "@/customFetch/ApiClient";
import { ApiClient } from "@/customFetch/ApiClient";
import BaseService from "../services/base.service";

class UserService extends BaseService {
    name: any
    constructor(name: string) {
        super(null);
        this.name = name
    }

    signCourse(reqObj: any) {
        const url = `/${this.name}/sign-course`;
        return new Promise((resolve, reject) => {
            ApiClient.post(url, reqObj)
                .then((response: any) => {
                    const res = response.data || {};
                    resolve(res);
                })
                .catch(() => reject(handleError()));
        });
    }
}

export default UserService;

function handleError(): any {
    throw new Error('Function not implemented.');
}