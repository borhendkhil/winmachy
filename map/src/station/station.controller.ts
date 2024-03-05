import { Body, Controller, Get, Post } from '@nestjs/common';
import { StationService } from './station.service';
import { Station } from './schema/station.schema';

@Controller('station')
export class StationController {

    constructor(private stationService: StationService) { }
    @Get()
    findAll() {
        return this.stationService.findAll();
    }

    @Get(':id')
    findOne(id: string) {
        return this.stationService.findOne(id);
    }

    @Post()
    create(@Body() Station:Station){
        return this.stationService.create(Station);
    }
}