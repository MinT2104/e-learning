import { StoreType } from "./src/redux/StoreType";

export declare global {
    typeof global;
    var $action: any;
    var $state: StoreType
}