import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { InstitutionRepository } from 'src/institution/institution.respository';
import { Institution } from '../types/user.type';
import { CreateInstitutionDto } from 'src/institution/dto/create-institution.dto';
import { UpdateInstitutionDto } from 'src/institution/dto/update-institution.dto';

@Injectable()
export class PrismaInstitutionRepository extends InstitutionRepository {
  constructor(private prisma: PrismaService) {
    super();
  }

  async create(data: CreateInstitutionDto): Promise<Institution> {
    const created = await this.prisma.institution.create({
      data,
    });

    return {
      id: created.id,
      name: created.name,
      address: created.address,
      country: created.country,
    } as Institution;
  }

  async findById(id: string): Promise<Institution> {
    const institution = await this.prisma.institution.findUnique({
      where: { id },
    });

    return institution as Institution;
  }

  async update(
    updateInstitution: UpdateInstitutionDto,
    userId: string,
  ): Promise<Institution> {
    const updated = await this.prisma.institution.update({
      where: { id: userId },
      data: updateInstitution,
    });

    return updated as Institution;
  }

  async findAll(): Promise<Partial<Institution>[]> {
    const institutions = await this.prisma.institution.findMany();
    return institutions.map((institution) => ({
      id: institution.id,
      name: institution.name,
    }));
  }
}
