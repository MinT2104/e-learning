// import { ApiClient } from "@/customFetch/ApiClient";
import BaseService from "../services/base.service";

class CourseService extends BaseService {
    constructor(state: any) {
        super(state);
        this.name = "course";
        // this.model = {};
    }
}

export default CourseService;