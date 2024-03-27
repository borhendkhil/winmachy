import { Module } from '@nestjs/common';
import { TransportService } from './transport.service';
import { TransportController } from './transport.controller';

import { TransportSchema, Transport  } from './schema/transport.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transport.name , schema: TransportSchema }]),
  ],
  providers: [TransportService],
  controllers: [TransportController]
})
export class TransportModule {}
