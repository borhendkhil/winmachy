import {Prop , Schema , SchemaFactory} from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';


export type RouterDocument = HydratedDocument<Router>;
@Schema()
export class Router {
  
    @Prop()
    name: string;
    @Prop()
    path: string;
    @Prop()
    method: string;
    @Prop()
    handler: string;
    @Prop(type => [String])
    station: string[];

}
export const RouterSchema = SchemaFactory.createForClass(Router);