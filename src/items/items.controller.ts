import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Response as ResponseExpress } from 'express';
import { ItemsService } from './item.service';
import { Iitems } from './items.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getFindAll(@Res() res: ResponseExpress) {
    try {
      const items: Iitems[] = await this.itemsService.getAllItem();
      return res.status(200).json(items);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  }

  @Get(':id')
  async getFindOne(@Param('id') id: string, @Res() res: ResponseExpress) {
    try {
      const item = await this.itemsService.getByIdItem(+id);
      return res.status(200).json(item);
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        return res.status(404).json({ error: 'Item not found', id });
      }
      return res.status(500).json({
        error: 'Ocurrió un error en el API.',
        detail: error.message || error,
      });
    }
  }

  @Post()
  async createItem(@Body() body: Iitems, @Res() res: ResponseExpress) {
    try {
      const newItem = await this.itemsService.createItem(body);
      return res.status(201).json(newItem);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  }

  @Put(':id')
  async updateItem(
    @Param('id') id: string,
    @Body() body: Iitems,
    @Res() res: ResponseExpress,
  ) {
    try {
      const updatedItem = await this.itemsService.updateItem(+id, body);
      return res.status(200).json(updatedItem);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string, @Res() res: ResponseExpress) {
    try {
      const result = await this.itemsService.deleteItem(+id);
      return res.status(204).json(result);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  }

  private handleError(res: ResponseExpress, error: any) {
    console.log('API Error:', error.message || error);

    if (error.response && error.response.errors) {
      return res.status(error.status || 400).json(error.response);
    }

    return res.status(error.status || 500).json({
      error: 'Ocurrió un error en el API.',
      detail: error.message || error,
    });
  }
}
