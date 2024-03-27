import { Controller, Get, Param, Post, Body, Put, Delete, Query } from '@nestjs/common';
import { RouterService } from './router.service';
import { Router } from './schema/router.schema';
import { Station } from '../station/schema/station.schema';
import { ShortestPathDto } from './dto/shortest-path.dto';

@Controller('routers')
export class RouterController {
    constructor(private readonly routerService: RouterService) { }

    @Get()
    async findAll(): Promise<Router[]> {
        return this.routerService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Router> {
        return this.routerService.findOne(id);
    }

    @Post()
    async create(@Body() router: Router): Promise<Router> {
        return this.routerService.create(router);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() router: Router): Promise<Router> {
        return this.routerService.update(id, router);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Router> {
        return this.routerService.remove(id);
    }

    @Put(':id/add-station')
    async addStation(@Param('id') id: string, @Body() station: Station): Promise<Router> {
        return this.routerService.addStation(id, station);
    }

    @Get('nearest')
    async findNearestRouter(@Query('x') x: number, @Query('y') y: number): Promise<Router> {
        const position = { x, y };
        return this.routerService.findNearestRouter(position);
    }

    @Post('shortest-path')
    async findShortestPath(@Body() body: ShortestPathDto): Promise<[Station[], number]> {
        const { startX, startY, endX, endY } = body;
        const startStation = await this.routerService.findNearestStation({ x: startX, y: startY });
        const endStation = await this.routerService.findNearestStation({ x: endX, y: endY });
       
        return this.routerService.dijkstra(startStation, endStation);
    }

}
