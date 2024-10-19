// import { getConfig } from '~/config';
import { ApiClient } from '../customFetch/ApiClient';

class BaseService {
    name: any;
    model: any;
    constructor(state: any) {
        Object.assign(this, state);
        // this.config = getConfig(process.env.NODE_ENV);
    }

    loadAllWithPaging(reqObj: any) {
        const {
            page = 1, limit = 10,
        } = reqObj;
        // delete reqObj.query.page
        // delete reqObj.query.limit

        let url = `/${this.name}?page=${page}&limit=${limit}`;
        const request = parsedQuery(url, reqObj);

        return new Promise((resolve, reject) => {
            ApiClient.get(request.url).then((response: any) => {
                const res = response || {};
                let data = {
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
                console.log(e);
                reject({ message: 'Failed to load records' });
            });
        });
    }

    save(reqObj: any) {
        let url = `/api/${this.name}/`;
        return new Promise((resolve, reject) => {
            ApiClient.post(url, reqObj)
                .then((response: any) => {
                    const res = response.data || {};
                    resolve(res);
                })
                .catch(() => reject(handleError()));
        });
    }

    update(reqObj: any) {
        const { _id } = reqObj;
        let url = `/api/${this.name}/${_id}/`;
        return new Promise((resolve, reject) => {
            ApiClient.put(url, reqObj)
                .then((response: { data: {}; }) => {
                    const res = response.data || {};
                    resolve(res);
                })
                .catch((e: any) => reject(e));
        });
    }

    getById(id: string) {
        let url = `/${this.name}/${id}`;
        // if (populates && populates.length > 0) {
        //   url += `/?populate[]=${populates[0]}`;
        //   for (let i = 1; i < populates.length; i++) {
        //     url += `&populate[]=${populates[i]}`;
        //   }
        // }
        return new Promise((resolve, reject) => {
            ApiClient.get(url)
                .then((response: any) => {
                    const res = response.data || {};
                    resolve(res);
                })
                .catch((e: any) => {
                    console.log(e);
                    reject(e);
                });
        });
    }

    create() {
        return Promise.resolve(this.model);
    }

    remove(reqObj: { _id: string; }) {
        const { _id } = reqObj;
        let url = `/api/${this.name}/${_id}`;
        return new Promise((resolve, reject) => {
            ApiClient.delete(url)
                .then((response: { data: {}; }) => {
                    const res = response.data || {};
                    resolve(res);
                })
                .catch((err: any) => reject(err));
        });
    }
}

export default BaseService;

function handleError(): any {
    throw new Error('Function not implemented.');
}

let parsedQuery = (url: string, reqObj: any) => {
    let requestUrl = url

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
