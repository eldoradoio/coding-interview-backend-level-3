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
import { IBaseItem } from './items.interface';

const TABLE_DATA: string = 'PRUEBA_DORADO';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async getFindAll(@Res() res: ResponseExpress) {
    try {
      const items: IBaseItem[] =
        await this.itemsService.getAllItems(TABLE_DATA);
      return res.status(200).json(items);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  }

  @Get(':id')
  async getFindOne(@Param('id') id: string, @Res() res: ResponseExpress) {
    try {
      const param: number = parseInt(id) || 0;
      const item = await this.itemsService.getItemById(TABLE_DATA, param);
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
  async createItem(@Body() body: IBaseItem, @Res() res: ResponseExpress) {
    try {
      const newItem = await this.itemsService.createItem(TABLE_DATA, body);
      return res.status(201).json(newItem);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  }

  @Put(':id')
  async updateItem(
    @Param('id') id: string,
    @Body() body: IBaseItem,
    @Res() res: ResponseExpress,
  ) {
    try {
      const param: number = parseInt(id) || 0;
      const updatedItem = await this.itemsService.updateItem(
        TABLE_DATA,
        param,
        body,
      );
      return res.status(200).json(updatedItem);
    } catch (error: any) {
      return this.handleError(res, error);
    }
  }

  @Delete(':id')
  async deleteItem(@Param('id') id: string, @Res() res: ResponseExpress) {
    try {
      const param: number = parseInt(id) || 0;
      const result = await this.itemsService.deleteItem(TABLE_DATA, param);
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
