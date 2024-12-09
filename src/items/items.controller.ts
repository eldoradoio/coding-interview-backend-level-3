import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { Response as ResponseExpress } from 'express';
import { ItemsService } from './item.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getFindAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  async getFindOne(@Param('id') id: string, @Res() res: ResponseExpress) {
    try {
      const rts = await this.itemsService.findOne(+id);
      return res.status(200).send(rts);
    } catch (error: any) {
      console.error('Ocurrió un error:', error.message || error);
      return res.status(500).json({
        error: 'Ocurrió un error en el API.',
        detail: error.message || error,
      });
    }
  }

  @Post()
  create(@Body() createItemDto: { name: string; price: number }) {
    return this.itemsService.create(createItemDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemDto: { name: string; price: number },
  ) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.delete(+id);
  }
}
