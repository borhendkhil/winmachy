import { Module } from '@nestjs/common';
import { StationController } from './station.controller';
import { StationService } from './station.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StationSchema, Station } from './schema/station.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Station.name , schema: StationSchema }]),
  ],
  exports: [MongooseModule.forFeature([{ name: Station.name, schema: StationSchema }])],

  controllers: [StationController],
  providers:[StationService]
 
})
export class StationModule {}
