import {IsString,IsArray,IsInt,IsDateString,MinLength,ArrayMinSize,Min} from 'class-validator';
export class CreateVictimaDto {
  @IsString()
  @MinLength(2)
  name:string;
  @IsArray()
  @ArrayMinSize(1)
  @IsString({each:true})
  skills:string[];
  @Min(1)
  last_seen:number;
  @IsString()
  @MinLength(2)
  transformation_status:string;
  @IsString()
  captured_by:string;
  @IsDateString()
  capture_date:string;
  @IsDateString()
  created_at:string;
  @IsDateString()
  updated_at:string;
}


