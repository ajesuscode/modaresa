import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment as AppointmentModel, Prisma } from '@prisma/client';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('all')
  async getAllAppointments(): Promise<AppointmentModel[]> {
    try {
      return this.appointmentsService.appointments({});
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  @Post('create')
  async createAppointment(
    @Body()
    appointmentData: CreateAppointmentDto,
  ): Promise<AppointmentModel> {
    console.log('appointmentData', appointmentData);
    try {
      const data: Prisma.AppointmentCreateInput = {
        startDate: appointmentData.startDate,
        endDate: appointmentData.endDate,
        member: {
          connect: { memberId: appointmentData.memberId },
        },
        client: {
          connect: { companyId: appointmentData.companyId },
        },
      };
      console.log('DATA', data);
      return this.appointmentsService.createAppointment(data);
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
}
