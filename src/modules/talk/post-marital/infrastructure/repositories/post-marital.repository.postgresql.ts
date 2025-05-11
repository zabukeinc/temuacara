import { Injectable } from '@nestjs/common';
import {
  PostMaritalProps,
  PostMaritalRepository,
} from '../../application/interfaces/post-marital.interface';
import { PaginatedResponseDto } from '@/modules/base/responses/base.paginated.response';
import { PostMaritalResponseEntity } from '../../domain/entities/post-marital.entity';
import {
  CreatePostMaritalProps,
  FindAllPostMaritalProps,
  UpdatePostMaritalProps,
} from '../../domain/types/post-marital.type';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { PostMaritalMapper } from '../mappers/posts-marital.mapper';

@Injectable()
export class PostMaritalRepositoryMysql implements PostMaritalRepository {
  constructor(protected readonly prismaService: PrismaService) {}

  async baseCreate(
    prop: CreatePostMaritalProps,
  ): Promise<PostMaritalResponseEntity> {
    try {
      const result = await this.prismaService.talk.create({
        data: PostMaritalMapper.toCreate(prop),
      });

      return Promise.resolve(PostMaritalMapper.toResponse(result));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  baseUpdate(
    prop: PostMaritalProps,
    payload: UpdatePostMaritalProps,
  ): Promise<PostMaritalResponseEntity> {
    throw new Error('Method not implemented.');
  }
  baseDelete(
    prop: PostMaritalProps,
    payload: unknown,
  ): Promise<PostMaritalResponseEntity> {
    throw new Error('Method not implemented.');
  }

  findAll(
    prop: FindAllPostMaritalProps,
  ): Promise<PaginatedResponseDto<PostMaritalResponseEntity>> {
    throw new Error('Method not implemented.');
  }
}
