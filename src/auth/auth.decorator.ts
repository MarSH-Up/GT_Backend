import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { UserAccessLevel } from './entities/auth.entity';
import { AccessAuthGuard } from './auth.guard';

export function AccessAuth(...access: UserAccessLevel[]): PropertyDecorator {
  return applyDecorators(
    SetMetadata('access', access),
    UseGuards(AccessAuthGuard),
  );
}
