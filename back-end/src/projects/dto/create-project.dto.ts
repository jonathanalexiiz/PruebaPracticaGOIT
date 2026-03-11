import { IsString, IsNotEmpty, IsOptional, IsHexColor } from 'class-validator';

export class CreateProjectDto {
  @IsString({ message: 'El nombre debe ser texto' })
  @IsNotEmpty({ message: 'El nombre del proyecto es obligatorio' })
  name: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser texto' })
  description?: string;

  @IsOptional()
  @IsHexColor({ message: 'El color debe ser un código hexadecimal válido' })
  color?: string;
}
