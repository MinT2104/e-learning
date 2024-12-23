// import { ApiClient } from "@/customFetch/ApiClient";
import BaseService from "./base.service";

class NotificationService extends BaseService {
    name: any
    constructor(name: string) {
        super(null);
        this.name = name
    }
}

export default NotificationService;