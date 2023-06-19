import { 
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete 
} from '@nestjs/common';
import { News } from '@prisma/client';
import { AppService } from './app.service';
import { CreateNewsDto } from './dto/create.news.dto';
import { UpdateNewsDto } from './dto/update.news.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Вывод всех существующих записей
  @Get('/news')
  findAll() {
    return this.appService.findMany({});
  }
  
  // Вывод указанной записи
  @Get('/:idNews')
  findOne(@Param('idNews') id: string) {
    return this.appService.findOne({ id });
  }

  // Создание записи
  @Post('/news')
  create(
    @Body()
    data: CreateNewsDto,
    ): Promise<News> { 
      return this.appService.create(data); 
    }

  // Обновление указанной записи
  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
  ) {
    return this.appService.update({
      where: { id },
      data: updateNewsDto,
    })
  }

  // Удаление указанной записи
  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.appService.delete({ id })
  }
}
