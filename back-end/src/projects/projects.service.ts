/* eslint-disable prettier/prettier */
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    const nuevoProyecto = await this.prismaService.project.create({
      data: {
        name: createProjectDto.name,
        description: createProjectDto.description,
        color: createProjectDto.color,
        userId: userId,
      },
    });
    return nuevoProyecto;
  }

  async findAll(userId: string) {
    const proyectosUsuario = await this.prismaService.project.findMany({
      where: {
        userId,
      },
    });

    return proyectosUsuario;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} project`;
  // }

 async update(idProject: string, userId: string, updateProjectDto: UpdateProjectDto) {
  const proyectoEncontrado = await this.prismaService.project.findUnique({
    where: { id: idProject },
  });

  if (!proyectoEncontrado) {
    throw new NotFoundException('Proyecto no encontrado');
  }

  if (proyectoEncontrado.userId !== userId) {
    throw new ForbiddenException(
      'No tienes permiso para modificar este proyecto',
    );
  }

  const proyectoActualizado = await this.prismaService.project.update({
    where: { id: idProject },
    data: updateProjectDto,
  });

  return proyectoActualizado;
}

 async remove(idProject: string, userId: string) {
    const proyectoEncontrado = await this.prismaService.project.findUnique({
      where: { id: idProject },
    });

    if (!proyectoEncontrado) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    if (proyectoEncontrado.userId !== userId) {
      throw new ForbiddenException('No tienes permiso para eliminar este proyecto');
    }

    const proyectoEliminado = await this.prismaService.project.delete({
      where: { id: idProject },
    });

  return proyectoEliminado;
}
}
