import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Información del usuario autenticado',
    type: User
  })
  user: User;

  @ApiProperty({
    description: 'Token JWT para autenticación',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzdWFyaW9AZWplbXBsby5jb20iLCJyb2xlcyI6InNsYXZlIiwiaWF0IjoxNjQwOTk1MjAwfQ.example_signature'
  })
  token: string;
}