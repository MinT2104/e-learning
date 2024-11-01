import { ApiClient } from "@/customFetch/ApiClient";
import BaseService from "../services/base.service";

class CourseService extends BaseService {
    constructor(state: any) {
        super(state);
        this.name = "course";
        // this.model = {};
    }
    loadAllCoursesWithPaging(reqObj: any) {
        const {
            page = 1, limit = 10,
        } = reqObj;

        const url = `/${this.name}?page=${page}&limit=${limit}`;
        const request = parsedQuery(url, reqObj);

        return new Promise((resolve, reject) => {
            ApiClient.get(request.url, {
                params: request.params
            }).then((response: any) => {
                const res = response || {};
                const data = {
                    records: [],
                    total: 0,
                    errors: ""
                };
                data.records = res.data || [];
                data.total = res.total || 0;
                if (res.message) {
                    data.errors = res.message;
                }
                resolve(data);
            }).catch((e: any) => {
                console.log(e)
                reject({ message: 'Failed to load records' });
            });
        });
    }

}

export default CourseService;
const parsedQuery = (url: string, reqObj: any) => {
    const requestUrl = url

    const {
        query,
        _id
    } = reqObj

    const params: any = {
        query: {},
    }
    params.query = query

    if (_id) {
        params._id = _id
    }
    return {
        url: requestUrl,
        params,
    }
}
