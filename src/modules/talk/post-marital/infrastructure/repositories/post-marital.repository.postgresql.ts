import { Injectable, NotFoundException } from '@nestjs/common';
import { PostMaritalRepository } from '../../application/interfaces/post-marital.interface';
import { PaginatedResponseDto } from '@/modules/base/responses/base.paginated.response';
import { PostMaritalEntity } from '../../domain/entities/post-marital.entity';
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
  baseDelete(prop: unknown): Promise<PostMaritalEntity> {
    throw new Error('Method not implemented.');
  }

  async baseCreate(prop: CreatePostMaritalProps): Promise<PostMaritalEntity> {
    try {
      const result = await this.prismaService.talk.create({
        data: PostMaritalMapper.toCreate(prop),
      });

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async baseUpdate(
    prop: Partial<UpdatePostMaritalProps>,
    payload: PostMaritalEntity,
  ): Promise<PostMaritalEntity> {
    try {
      const exist = await this.prismaService.talk.findFirst({
        where: prop,
      });
      if (!exist) {
        throw new NotFoundException('Post Marital not found');
      }

      return await this.prismaService.talk.update({
        where: {
          id: payload.id,
        },
        data: PostMaritalMapper.toUpdate(prop),
      });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async findAll(
    prop: FindAllPostMaritalProps,
  ): Promise<PaginatedResponseDto<PostMaritalEntity>> {
    try {
      const query = PostMaritalMapper.toFindAll(prop);
      const [datas, count] = await Promise.all([
        this.prismaService.talk.findMany(query),
        this.prismaService.talk.count({
          where: query.where,
        }),
      ]);

      const paginated = PostMaritalMapper.toPaginated(
        datas,
        count,
        prop.page,
        prop.limit,
      );

      return Promise.resolve(paginated);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
