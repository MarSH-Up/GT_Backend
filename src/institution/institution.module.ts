import { Module } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { InstitutionController } from './institution.controller';
import { InstitutionRepository } from './institution.respository';
import { PrismaInstitutionRepository } from 'src/user/repositories/prisma-institution.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [InstitutionController],
  providers: [
    InstitutionService,
    { provide: InstitutionRepository, useClass: PrismaInstitutionRepository },
  ],
})
export class InstitutionModule {}
