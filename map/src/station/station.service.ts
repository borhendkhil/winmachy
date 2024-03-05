import { Injectable } from '@nestjs/common';
import { Station } from './schema/station.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StationService {
    constructor(@InjectModel(Station.name) private stationModel: Model<Station>) {}

    async create(station: Station): Promise<Station> {
        const createdStation = new this.stationModel(station);
        return createdStation.save();
    }

    async findAll(): Promise<Station[]> {
        return this.stationModel.find().exec();
    }

    async findOne(id: string): Promise<Station> {
        return this.stationModel.findOne({ _id: id }).exec();
    }
}
