import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from './router/router.module'; // Import RouterModule
import { StationService } from './station/station.service';
import { StationModule } from './station/station.module';
import { TransportModule } from './transport/transport.module';

@Module({
  imports: [    
    MongooseModule.forRoot('mongodb+srv://borhendkhiill:1234567890@winmachy.ix3qmss.mongodb.net/winmachyDB', {
   
    }),
    RouterModule 
    ,
    StationModule,
    TransportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
