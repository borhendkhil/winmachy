import { Module } from '@nestjs/common';
import { RouterController } from './router.controller';
import { RouterService } from './router.service';
import { Router, RouterSchema } from './schema/router.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { StationModule } from 'src/station/station.module';


@Module({
  imports: [
    StationModule, 
    MongooseModule.forFeature([{ name: Router.name, schema: RouterSchema }]),
  ],
  controllers: [RouterController],
  providers: [RouterService],
})
export class RouterModule {}