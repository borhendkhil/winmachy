import { Document } from "mongodb";
interface Router {
    _id: string;
    name: string;
    path: string;
    method: string;
    handler: string;
}
export declare type RouterDocument = Router & Document;