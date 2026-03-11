/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    id: string;
    email: string;
    role: string;
  };
}
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @Req() request: RequestWithUser,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectsService.create(request.user.id, createProjectDto);
  }

  @Get()
  findAll(@Req() request: RequestWithUser) {
    return this.projectsService.findAll(request.user.id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.projectsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') idProject: string, @Req() request: RequestWithUser, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(idProject, request.user.id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') idProject: string, @Req() request: RequestWithUser) {
    return this.projectsService.remove(idProject, request.user.id);
  }
}
