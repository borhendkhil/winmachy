import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Station {
    @Prop()
    name: string;

    @Prop()
    positionx: string;

    @Prop()
    positiony: string;
}

export const StationSchema = SchemaFactory.createForClass(Station);
