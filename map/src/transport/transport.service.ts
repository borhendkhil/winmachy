import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transport } from './schema/transport.schema';
import { Model } from 'mongoose';


@Injectable()
export class TransportService {
    constructor(@InjectModel(Transport.name) 
    private transportModel: Model<Transport>) {}

    async create (transport: Transport):Promise<Transport>{
        const createdTransport = new this .transportModel(transport);
        return createdTransport.save()
    }
    async findAll(): Promise<Transport[]> {
        return this.transportModel.find().exec();
    }

    async findOne(id: string): Promise<Transport> {
        return this.transportModel.findOne({ _id: id }).exec(); 
    }
    async update(id: string, Transport: Transport): Promise<Transport> {
        return this.transportModel.findByIdAndUpdate(id, Transport, { new: true });
    }
    async remove(id: string): Promise<Transport> {
        return this.transportModel.findByIdAndDelete(id);
    }
}
