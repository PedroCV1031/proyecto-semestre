import { PartialType } from '@nestjs/mapped-types';
import { CreateVictimaDto } from './create-victima.dto';

export class UpdateVictimaDto extends PartialType(CreateVictimaDto) {}
