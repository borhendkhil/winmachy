import {Prop , Schema , SchemaFactory} from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';
import { Station } from 'src/station/schema/station.schema';


export type RouterDocument = HydratedDocument<Router>;
@Schema()
export class Router {
  
    @Prop()
    name: string;
    
    @Prop(type => [Station])
    stations: Station[];

}
export const RouterSchema = SchemaFactory.createForClass(Router);