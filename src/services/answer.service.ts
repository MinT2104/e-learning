import BaseService from "./base.service";

class AnswerService extends BaseService {
    name: any
    constructor(name: string) {
        super(null);
        this.name = name
    }

}

export default AnswerService;


