// import { ApiClient } from "@/customFetch/ApiClient";
import { ApiClient } from "@/customFetch/ApiClient";
import BaseService from "./base.service";

class ExamService extends BaseService {
    name: any
    constructor(name: string) {
        super(null);
        this.name = name
    }

    createExam(reqObj: any) {
        const url = `/${this.name}/create-exam`;
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

export default ExamService;

function handleError(): any {
    throw new Error('Function not implemented.');
}
