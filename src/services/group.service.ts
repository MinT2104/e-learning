// import { ApiClient } from "@/customFetch/ApiClient";
import BaseService from "../services/base.service";

class GroupService extends BaseService {
    name: any
    constructor(name: string) {
        super(null);
        this.name = name
    }
}

export default GroupService;