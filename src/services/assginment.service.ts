// import { ApiClient } from "@/customFetch/ApiClient";
import BaseService from "../services/base.service";

class AssignmentService extends BaseService {
    constructor(state: any) {
        super(state);
        this.name = "assignment";
        // this.model = {};
    }
}

export default AssignmentService;