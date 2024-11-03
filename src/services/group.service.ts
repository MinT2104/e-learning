// import { ApiClient } from "@/customFetch/ApiClient";
import BaseService from "../services/base.service";

class GroupService extends BaseService {
    constructor(state: any) {
        super(state);
        this.name = "group";
        // this.model = {};
    }
}

export default GroupService;