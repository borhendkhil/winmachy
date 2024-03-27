import { Document } from "mongodb";
import { Station } from "src/station/schema/station.schema";
interface Router {
    _id: string;
    name: string;    
    station: Station[];  
}
export declare type RouterDocument = Router & Document;