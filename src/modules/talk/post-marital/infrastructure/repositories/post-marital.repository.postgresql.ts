import { Injectable, NotFoundException } from '@nestjs/common';
import {
  PostMaritalProps,
  PostMaritalRepository,
} from '../../application/interfaces/post-marital.interface';
import { PaginatedResponseDto } from '@/modules/base/responses/base.paginated.response';
import { PostMaritalResponseEntity } from '../../domain/entities/post-marital.entity';
import {
  CreatePostMaritalProps,
  DeletePostMaritalProps,
  FindAllPostMaritalProps,
  UpdatePostMaritalProps,
} from '../../domain/types/post-marital.type';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { PostMaritalMapper } from '../mappers/posts-marital.mapper';
import { BasePaginatedResponseDTO } from '@/modules/base/responses/base.paginated.v2.response';

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

  async baseUpdate(
    prop: PostMaritalProps,
    payload: UpdatePostMaritalProps,
  ): Promise<PostMaritalResponseEntity> {
    try {
      const exist = await this.prismaService.talk.findFirst({
        where: { id: prop.updateProps.id },
      });
      if (!exist) {
        throw new NotFoundException('Post marital not found');
      }

      const updated = await this.prismaService.talk.update({
        where: { id: prop.updateProps.id },
        data: PostMaritalMapper.toUpdate(payload),
      });

      return Promise.resolve(PostMaritalMapper.toResponse(updated));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async findAll(
    prop: FindAllPostMaritalProps,
  ): Promise<BasePaginatedResponseDTO<PostMaritalResponseEntity>> {
    try {
      return;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async baseDelete(payload: DeletePostMaritalProps): Promise<number> {
    try {
      const result = await this.prismaService.talk.deleteMany({
        where: {
          id: {
            in: payload.ids.map((item) => Number(item)),
          },
        },
      });

      return Promise.resolve(result.count);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
