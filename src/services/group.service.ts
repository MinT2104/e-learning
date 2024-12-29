import { ApiClient } from "@/customFetch/ApiClient";
import BaseService from "../services/base.service";

class GroupService extends BaseService {
    name: any
    constructor(name: string) {
        super(null);
        this.name = name
    }

    getUserListCourse(reqObj: any) {
        const url = `/${this.name}/user-list-course`;
        return new Promise((resolve, reject) => {
            ApiClient.post(url, reqObj).then((response: any) => {
                const res = response.data || {};
                resolve(res);
            })
                .catch((e: any) => {
                    reject(e);
                });
        });
    }

    deleteMember(reqObj: any) {
        const url = `/${this.name}/delete-member`;
        return new Promise((resolve, reject) => {
            ApiClient.post(url, reqObj).then((response: any) => {
                const res = response.data || {};
                resolve(res);
            })
                .catch((e: any) => {
                    reject(e);
                });
        });
    }
}

export default GroupService;