import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';

import { InstitutionRepository } from './institution.respository';

@Injectable()
export class InstitutionService {
  constructor(private institutionRepository: InstitutionRepository) {}

  async create(createInstitutionDto: CreateInstitutionDto) {
    return this.institutionRepository.create(createInstitutionDto);
  }

  async findById(id: string) {
    return this.institutionRepository.findById(id);
  }

  async findAll() {
    return this.institutionRepository.findAll();
  }
}
