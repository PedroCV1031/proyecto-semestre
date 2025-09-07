import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateRankingDto {
  @IsString()
  slave_id: string; // referencia al usuario (Slave)

  @IsNumber()
  @IsOptional()
  total_capturas?: number; // por defecto 0

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  recompensas?: string[]; // array de premios asignados
}
