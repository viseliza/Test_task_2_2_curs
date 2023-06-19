import { Prisma } from '@prisma/client';
import { IsEmpty } from 'class-validator';

export class UpdateNewsDto implements Prisma.NewsUpdateInput {
  // @IsEmpty()

  authtor: string;
  content: string;

  social: string | null;
}