import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata): any {
    if (metadata.type !== 'body') return value;
    const { error } = this.schema.validate(value);
    if (error) {
      throw new UnprocessableEntityException(error.details);
    }
    return value;
  }
}