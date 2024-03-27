import {Document  } from "mongoose";

export interface Transport {
    type: string;   
    
    route: string;
    
}
export type TransportDocument = Transport & Document;