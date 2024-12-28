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

    createStudentExam(reqObj: any) {
        const url = `/${this.name}/create-student-exam`;
        return new Promise((resolve, reject) => {
            ApiClient.post(url, reqObj)
                .then((response: any) => resolve(response.data))
                .catch(() => reject(handleError()));
        });
    }

    updateStudentExam(reqObj: any) {
        const { _id } = reqObj;
        const url = `/${this.name}/update-student-exam/${_id}`;
        return new Promise((resolve, reject) => {
            ApiClient.put(url, reqObj)
                .then((response: any) => resolve(response.data))
                .catch(() => reject(handleError()));
        });
    }
}

export default ExamService;

function handleError(): any {
    throw new Error('Function not implemented.');
}
