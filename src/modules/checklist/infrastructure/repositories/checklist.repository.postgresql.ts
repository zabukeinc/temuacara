import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ChecklistProps,
  ChecklistRepository,
} from '../../application/interfaces/checklist.interface';
import {
  CreateChecklistProps,
  DeleteChecklistProps,
  FindAllChecklistProps,
  UpdateChecklistProps,
} from '../../domain/types/checklist.type';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ChecklistMapper } from '../mappers/checklist.mapper';
import { ChecklistEntity } from '../../domain/entities/checklist.entity';
import { BasePaginatedResponseDTO } from '@/modules/base/responses/base.paginated.v2.response';
import { PaginationHelper } from '@/modules/base/responses/pagination.response.helper';

@Injectable()
export class ChecklistRepositoryMysql implements ChecklistRepository {
  constructor(protected readonly prismaService: PrismaService) {}

  async baseCreate(prop: CreateChecklistProps): Promise<ChecklistEntity> {
    try {
      const result = await this.prismaService.checklist.create({
        data: ChecklistMapper.toCreate(prop),
      });

      return Promise.resolve(ChecklistMapper.toDomain(result));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async baseUpdate(
    prop: ChecklistProps,
    payload: UpdateChecklistProps,
  ): Promise<ChecklistEntity> {
    try {
      const exist = await this.prismaService.checklist.findFirst({
        where: { id: prop.updateProps.id },
      });
      if (!exist) {
        throw new NotFoundException('Post marital not found');
      }

      const updated = await this.prismaService.checklist.update({
        where: { id: prop.updateProps.id },
        data: ChecklistMapper.toUpdate(payload),
      });

      return Promise.resolve(ChecklistMapper.toDomain(updated));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async findAll(
    prop: FindAllChecklistProps,
  ): Promise<BasePaginatedResponseDTO<ChecklistEntity>> {
    try {
      const query = ChecklistMapper.toFindAll(prop);
      const [datas, count] = await Promise.all([
        this.prismaService.checklist.findMany(query),
        this.prismaService.checklist.count({
          where: query.where,
        }),
      ]);

      return PaginationHelper.createPaginatedResponse(
        {
          page: prop.page,
          limit: prop.limit,
          search: prop.search,
          baseUrl: 'checklists',
        },
        datas,
        count,
        (data) => ChecklistMapper.toDomain(data),
      );
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async baseDelete(payload: DeleteChecklistProps): Promise<number> {
    try {
      const result = await this.prismaService.checklist.deleteMany({
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
    payload: CreateChecklistProps[],
  ): Promise<ChecklistEntity[]> {
    try {
      const result = await this.prismaService.checklist.createManyAndReturn({
        data: payload.map((item) => ChecklistMapper.toCreate(item)),
      });

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
