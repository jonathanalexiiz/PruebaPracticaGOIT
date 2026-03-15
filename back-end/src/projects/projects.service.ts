/* eslint-disable prettier/prettier */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TaskStatus } from '../../generated/prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: string, createProjectDto: CreateProjectDto) {
    const nuevoProyecto = await this.prismaService.project.create({
      data: {
        name: createProjectDto.name,
        description: createProjectDto.description,
        color: createProjectDto.color,
        userId,
      },
    });

    return nuevoProyecto;
  }

  async findAll(userId: string) {
    const proyectosUsuario = await this.prismaService.project.findMany({
      where: {
        userId,
      },
      include: {
        tasks: {
          select: {
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return proyectosUsuario.map((proyecto) => {
      const pendientes = proyecto.tasks.filter(
        (task) => task.status === TaskStatus.PENDING,
      ).length;

      const enProgreso = proyecto.tasks.filter(
        (task) => task.status === TaskStatus.IN_PROGRESS,
      ).length;

      const completadas = proyecto.tasks.filter(
        (task) => task.status === TaskStatus.COMPLETED,
      ).length;

      return {
        id: proyecto.id,
        name: proyecto.name,
        description: proyecto.description,
        color: proyecto.color,
        createdAt: proyecto.createdAt,
        updatedAt: proyecto.updatedAt,
        userId: proyecto.userId,
        totalTasks: proyecto.tasks.length,
        tasksByStatus: {
          pending: pendientes,
          inProgress: enProgreso,
          completed: completadas,
        },
      };
    });
  }

  async update(
    idProject: string,
    userId: string,
    updateProjectDto: UpdateProjectDto,
  ) {
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
      throw new ForbiddenException(
        'No tienes permiso para eliminar este proyecto',
      );
    }

    const proyectoEliminado = await this.prismaService.project.delete({
      where: { id: idProject },
    });

    return proyectoEliminado;
  }
}