import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { MembersModule } from 'src/members/members.module';
import { ClientsModule } from './clients/clients.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule,
    AppointmentsModule,
    MembersModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
