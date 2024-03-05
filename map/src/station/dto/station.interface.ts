import { Document } from 'mongoose';

export interface Station {
    name: string;
    positionx: string;
    positiony: string;
}

export type StationDocument = Station & Document;
