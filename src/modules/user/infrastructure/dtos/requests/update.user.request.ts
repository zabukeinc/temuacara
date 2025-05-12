import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserRequest {
  @ApiProperty({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '+1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'confirmPass123' })
  current_password: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @ApiPropertyOptional({ example: 'confirmPass123' })
  new_password?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @ApiPropertyOptional({ example: 'confirmPass123' })
  confirm_password?: string;

  id: string;
}
