import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from '@prisma/client';
import { CreateItemDto } from './dto/create-item.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { RequestUser } from '../types/requestUser';
import { ApiResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/common/filters/http_exception/http_exception.filter';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createItemDto: CreateItemDto,
    @Request() req: ExpressRequest & { user: RequestUser },
  ): Promise<Item> {
    return await this.itemsService.create(createItemDto, req.user.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: '変更が成功した場合',
  })
  @ApiResponse({
    status: 404,
    description: '該当のitemが見つからなかった場合',
    content: {
      'application/json': {
        example: {
          message: 'Not Found',
          statusCode: 404,
        },
      },
    },
  })
  async updateStatus(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return await this.itemsService.updateStatus(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(HttpExceptionFilter)
  @ApiResponse({
    status: 200,
    description: '削除が成功した場合',
  })
  @ApiResponse({
    status: 404,
    description: '該当のitemが見つからなかった場合',
    content: {
      'application/json': {
        example: {
          message: 'Not Found',
          statusCode: 404,
        },
      },
    },
  })
  async delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: ExpressRequest & { user: RequestUser },
  ) {
    await this.itemsService.delete(id, req.user.id);
  }
}
