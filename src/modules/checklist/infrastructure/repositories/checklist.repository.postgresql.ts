import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ChecklistProps,
  ChecklistRepository,
} from '../../application/interfaces/checklist.interface';
import { PaginatedResponseDto } from '@/modules/base/responses/base.paginated.response';
import { ChecklistResponseEntity } from '../../domain/entities/checklist.entity';
import {
  CreateChecklistProps,
  DeleteChecklistProps,
  FindAllChecklistProps,
  UpdateChecklistProps,
} from '../../domain/types/checklist.type';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ChecklistMapper } from '../mappers/checklist.mapper';

@Injectable()
export class ChecklistRepositoryMysql implements ChecklistRepository {
  constructor(protected readonly prismaService: PrismaService) {}

  async baseCreate(
    prop: CreateChecklistProps,
  ): Promise<ChecklistResponseEntity> {
    try {
      const result = await this.prismaService.checklist.create({
        data: ChecklistMapper.toCreate(prop),
      });

      return Promise.resolve(ChecklistMapper.toResponse(result));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async baseUpdate(
    prop: ChecklistProps,
    payload: UpdateChecklistProps,
  ): Promise<ChecklistResponseEntity> {
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

      return Promise.resolve(ChecklistMapper.toResponse(updated));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async findAll(
    prop: FindAllChecklistProps,
  ): Promise<PaginatedResponseDto<ChecklistResponseEntity>> {
    try {
      const query = ChecklistMapper.toFindAll(prop);
      const [datas, count] = await Promise.all([
        this.prismaService.checklist.findMany(query),
        this.prismaService.checklist.count({
          where: query.where,
        }),
      ]);

      const result = ChecklistMapper.toPaginated(
        datas,
        count,
        prop.page,
        prop.limit,
      );

      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async baseDelete(payload: DeleteChecklistProps): Promise<number> {
    try {
      const result = await this.prismaService.checklist.deleteMany({
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
