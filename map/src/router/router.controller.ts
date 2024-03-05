import { Body, Controller, Get, Post } from '@nestjs/common';
import { RouterService } from './router.service';
import { Router } from './schema/router.schema';

@Controller('router')
export class RouterController {

    constructor(private routerService: RouterService) { }

    @Get()
    findAll() {
        return this.routerService.findAll();
    }

    @Get(':id')
    findOne(id: string) {
        return this.routerService.findOne(id);
    }

    @Post()
    create(@Body() Router: Router) {
        return this.routerService.create(Router);
    }
}
