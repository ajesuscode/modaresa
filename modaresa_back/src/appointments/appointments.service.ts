import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Appointment, Prisma } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async appointment(
    appointmentWhereUniqueInput: Prisma.AppointmentWhereUniqueInput,
  ): Promise<Appointment | null> {
    return this.prisma.appointment.findUnique({
      where: appointmentWhereUniqueInput,
    });
  }

  async appointments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AppointmentWhereUniqueInput;
    where?: Prisma.AppointmentWhereInput;
    orderBy?: Prisma.AppointmentOrderByWithRelationInput;
  }): Promise<Appointment[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.appointment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createAppointment(
    data: Prisma.AppointmentCreateInput,
  ): Promise<Appointment> {
    return this.prisma.appointment.create({
      data,
    });
  }
}
