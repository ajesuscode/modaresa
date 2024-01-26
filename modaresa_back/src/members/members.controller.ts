import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { Member as MemberModel } from '@prisma/client';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get('all')
  async getAllMembers(): Promise<MemberModel[]> {
    try {
      return this.membersService.members({});
    } catch (error) {
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  @Post('create')
  async createMember(
    @Body() memberData: { name: string; lastName: string },
  ): Promise<MemberModel> {
    try {
      return this.membersService.createMember(memberData);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }
}
