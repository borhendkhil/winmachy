import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type StationDocument = Station & Document;
@Schema()
export class Station {
    @Prop()
    name: string;
    @Prop()
    positionx: number;
    @Prop()
    positiony: number;
  
}

export const StationSchema = SchemaFactory.createForClass(Station);
