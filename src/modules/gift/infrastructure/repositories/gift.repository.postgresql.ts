import { Injectable, NotFoundException } from '@nestjs/common';
import {
  GiftProps,
  GiftRepository,
} from '../../application/interfaces/gift.interface';
import {
  CreateGiftProps,
  DeleteGiftProps,
  FindAllGiftProps,
  UpdateGiftProps,
} from '../../domain/types/gift.type';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { GiftMapper } from '../mappers/gift.mapper';
import { GiftEntity } from '../../domain/entities/gift.entity';
import { BasePaginatedResponseDTO } from '@/modules/base/responses/base.paginated.v2.response';
import { PaginationHelper } from '@/modules/base/responses/pagination.response.helper';

@Injectable()
export class GiftRepositoryMysql implements GiftRepository {
  constructor(protected readonly prismaService: PrismaService) {}

  async baseCreate(prop: CreateGiftProps): Promise<GiftEntity> {
    try {
      const result = await this.prismaService.gift.create({
        data: GiftMapper.toCreate(prop),
      });

      return Promise.resolve(GiftMapper.toDomain(result));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async baseUpdate(
    prop: GiftProps,
    payload: UpdateGiftProps,
  ): Promise<GiftEntity> {
    try {
      const exist = await this.prismaService.gift.findFirst({
        where: { id: prop.updateProps.id },
      });
      if (!exist) {
        throw new NotFoundException('Data not found');
      }

      const updated = await this.prismaService.gift.update({
        where: { id: prop.updateProps.id },
        data: GiftMapper.toUpdate(payload),
      });

      return Promise.resolve(GiftMapper.toDomain(updated));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async findAll(
    prop: FindAllGiftProps,
  ): Promise<BasePaginatedResponseDTO<GiftEntity>> {
    try {
      const query = GiftMapper.toFindAll(prop);
      const [datas, count] = await Promise.all([
        this.prismaService.gift.findMany(query),
        this.prismaService.gift.count({
          where: query.where,
        }),
      ]);

      return PaginationHelper.createPaginatedResponse(
        {
          page: prop.page,
          limit: prop.limit,
          search: prop.search,
          baseUrl: 'gifts',
        },
        datas,
        count,
        (data) => GiftMapper.toDomain(data),
      );
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async baseDelete(payload: DeleteGiftProps): Promise<number> {
    try {
      const result = await this.prismaService.gift.deleteMany({
        where: {
          id: {
            in: payload.ids,
          },
        },
      });

      return Promise.resolve(result.count);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async bulkCreate(
    payload: CreateGiftProps[],
  ): Promise<GiftEntity[]> {
    try {
      const result = await this.prismaService.gift.createManyAndReturn({
        data: payload.map((item) => GiftMapper.toCreate(item)),
      });

      return Promise.resolve(
        result.map((each) => GiftMapper.toDomain(each)),
      );
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async findOne(prop: GiftProps): Promise<GiftEntity> {
    try {
      const result = await this.prismaService.gift.findFirst({
        where: { id: prop.findOneProps.id },
      });
      return Promise.resolve(GiftMapper.toDomain(result));
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
