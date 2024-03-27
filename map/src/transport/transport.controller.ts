import { Body, Controller, Get, Post, Put ,Param,Delete} from '@nestjs/common';
import {TransportService} from './transport.service'
import { Transport} from './schema/transport.schema'


@Controller('transport')
export class TransportController {constructor(private transportService: TransportService) { }

@Get()
findAll() {
    return this.transportService.findAll();
}

@Get(':id')
findOne(id: string) {
    return this.transportService.findOne(id);
}

@Post()
create(@Body() Transport: Transport) {
    return this.transportService.create(Transport);
}

@Put(':id')
async update(@Param('id') id: string, @Body() Transport: Transport): Promise<Transport> {
    return this.transportService.update(id, Transport);
}

@Delete(':id')
async remove(@Param('id') id: string): Promise<Transport> {
    return this.transportService.remove(id);
}

}
