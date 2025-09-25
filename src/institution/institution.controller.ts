import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { AccessAuth } from 'src/auth/auth.decorator';
import { UserAccessLevel } from 'src/auth/entities/auth.entity';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  @Post()
  @AccessAuth(UserAccessLevel.ADMIN)
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionService.create(createInstitutionDto);
  }

  @Get(':id')
  @AccessAuth(UserAccessLevel.ADMIN)
  findById(@Param('id') id: string) {
    return this.institutionService.findById(id);
  }

  @Get()
  @AccessAuth(UserAccessLevel.ADMIN)
  findAll() {
    return this.institutionService.findAll();
  }
}
