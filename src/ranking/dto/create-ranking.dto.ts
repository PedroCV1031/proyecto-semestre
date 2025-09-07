import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateRankingDto {
  @IsString()
  slave_id: string; // debe ser ObjectId de User

  @IsNumber()
  @IsOptional()
  total_capturas?: number;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  recompensas?: string[];
}

