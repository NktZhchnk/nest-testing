import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { ItemsService } from './items.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JoiValidationPipe } from '../../pipes/joi-validation.pipe';
import { itemCreateUpdateSchema } from '@core/validation/item';
import { ItemCreateUpdateDto } from '@core/dto/item';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  getAll(){
    return this.itemsService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.itemsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(itemCreateUpdateSchema))
  create(@Body() item: ItemCreateUpdateDto) {
    return this.itemsService.create(item);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(itemCreateUpdateSchema))
  update(@Param('id') id: number, @Body() item: ItemCreateUpdateDto) {
    return this.itemsService.update(id, item);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: number) {
    return this.itemsService.delete(id);
  }
}
