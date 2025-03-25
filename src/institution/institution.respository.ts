import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { Institution } from './entities/institution.entity';

export abstract class InstitutionRepository {
  abstract create(
    data: Omit<Institution, 'id' | 'createdAt'>,
  ): Promise<Institution>;
  abstract findById(id: string): Promise<Institution>;
  abstract update(
    updateInstitution: UpdateInstitutionDto,
    userId: string,
  ): Promise<Institution>;
  abstract findAll(): Promise<Partial<Institution>[]>;
}
