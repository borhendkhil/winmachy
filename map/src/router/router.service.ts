import { Injectable } from '@nestjs/common';
import { Router } from './schema/router.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class RouterService {
    constructor(@InjectModel(Router.name)
    private routerModel: Model<Router>) { }
   

    async create(router: Router): Promise<Router> {
        const createdRouter = new this.routerModel(router);
        return createdRouter.save();
    }

    async findAll(): Promise<Router[]> {
        return this.routerModel.find().exec();
    }

    async findOne(id: string): Promise<Router> {
        return this.routerModel.findOne({ _id: id }).exec(); 
    }

    
   



}
