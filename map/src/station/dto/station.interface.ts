import { Document } from 'mongoose';

export interface Station {
    id: string;
    name: string;
    positionx: string;
    positiony: string;
}

export type StationDocument = Station & Document;
