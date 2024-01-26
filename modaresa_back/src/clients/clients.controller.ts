import {
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client as ClientModel } from '@prisma/client';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('all')
  async getAllClients(): Promise<ClientModel[]> {
    try {
      return this.clientsService.clients({});
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  @Post('create')
  async createClient(
    @Body() clientData: { companyName: string },
  ): Promise<ClientModel> {
    try {
      return this.clientsService.createClient(clientData);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
}
