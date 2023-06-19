import { Prisma } from '@prisma/client';
import { IsEmpty, IsNotEmpty } from 'class-validator';

export class CreateNewsDto implements Prisma.NewsCreateInput {
  // @IsEmpty()
  // owner: string;

  @IsNotEmpty()
  authtor: string;

  @IsNotEmpty()
  content: string;

  social: string | null;
  
}