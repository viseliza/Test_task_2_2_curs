import { Injectable } from '@nestjs/common';
import { News, Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create.news.dto';
import { UpdateNewsDto } from './dto/update.news.dto';

@Injectable()
export class AppService {
  constructor(private prisma:PrismaService) {}

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.NewsWhereUniqueInput;
    where?: Prisma.NewsWhereInput;
    orderBy?: Prisma.NewsOrderByWithRelationInput;
  }): Promise<News[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.news.findMany({ skip, take, cursor, where, orderBy });
  }

  async findOne(where: Prisma.NewsWhereUniqueInput): Promise<News> {
    const news: News = await this.prisma.news.findUnique({ where });

    if (!news) throw new NotFoundException('Новость не найдена');

    return news;
  }

  async create(data: CreateNewsDto): Promise<News>
  {
    data = {
      authtor: data.authtor,
      content: data.content,
      social:  data.social
    };
    return this.prisma.news.create({ data });
  }

  async update(params: {
    where: Prisma.NewsWhereUniqueInput;
    data: UpdateNewsDto;
  }): Promise<News> {
    const { data, where } = params;

    return this.prisma.news.update({ data, where });
  }

  async delete(
    where: Prisma.NewsWhereUniqueInput,
  ): Promise<News | NotFoundException> {
    const news: News = await this.prisma.news.findUnique({ where });

    if (!news) throw new NotFoundException('Invalid News');

    return this.prisma.news.delete({ where });
  }

}
