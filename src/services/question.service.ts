// import { ApiClient } from "@/customFetch/ApiClient";
import BaseService from "./base.service";

class QuestionService extends BaseService {
    name: any
    constructor(name: string) {
        super(null);
        this.name = name
    }
}

export default QuestionService;