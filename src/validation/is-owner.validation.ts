import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource, EntityManager } from 'typeorm';

interface IsOwnerInterface {
  tableName: string;
  column: string;
}

interface IsOwnerValue {
  userId: number;
  entityId: number;
}

@ValidatorConstraint({ name: 'IsOwnerConstraint', async: true })
@Injectable()
export class IsOwnerConstraint implements ValidatorConstraintInterface {
  constructor(private readonly entityManager: DataSource) {}

  async validate(value: IsOwnerValue, args?: ValidationArguments) {
    console.log('validation arguments', args);

    const { tableName, column }: IsOwnerInterface = args.constraints[0];
    const { userId, entityId } = value;

    const data = await this.entityManager.getRepository(tableName).findOne({
      where: { [column]: entityId, user: { id: userId } },
    });

    return !data;
  }

  defaultMessage() {
    return `Not found for this user`;
  }
}

export function IsOwner(
  options: IsOwnerInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isOwner',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsOwnerConstraint,
    });
  };
}
