import { Injectable, NotFoundException } from '@nestjs/common';
import { BasePaginatedResponseDTO } from '@/modules/base/responses/base.paginated.v2.response';
import { PaginationHelper } from '@/modules/base/responses/pagination.response.helper';
import { PrismaService } from '@/modules/prisma/prisma.service';
import {
  InvitationRepository,
  InvitationProps,
} from '../../application/interfaces/invitation.interface';
import { InvitationEntity } from '../../domain/entities/invitation.entity';
import {
  CreateInvitationProps,
  UpdateInvitationProps,
  FindAllInvitationProps,
  DeleteInvitationProps,
} from '../../domain/types/invitation.type';
import { InvitationMapper } from '../mappers/invitation.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class InvitationRepositoryMysql implements InvitationRepository {
  constructor(protected readonly prismaService: PrismaService) {}

  protected readonly defaultInclude: Prisma.InvitationInclude = {
    invitation_info: {
      include: {
        invitation_category: true,
      },
    },
    invitation_website: true,
  };

  async baseCreate(prop: CreateInvitationProps): Promise<InvitationEntity> {
    try {
      let result = await this.prismaService.invitation.create({
        data: InvitationMapper.toCreate(prop),
        include: this.defaultInclude,
      });
      let invitationCategory =
        await this.prismaService.invitationCategory.findFirst({
          where: {
            name: { contains: prop.info.category },
          },
        });

      if (!invitationCategory) {
        invitationCategory = await this.prismaService.invitationCategory.create(
          {
            data: {
              name: prop.info.category,
            },
          },
        );
      }

      await this.prismaService.invitationInfo.update({
        where: { id: result.invitation_info.id },
        data: {
          invitation_category_id: invitationCategory.id,
        },
      });

      return Promise.resolve(InvitationMapper.toDomain(result));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async baseUpdate(
    prop: InvitationProps,
    payload: UpdateInvitationProps,
  ): Promise<InvitationEntity> {
    try {
      const exist = await this.prismaService.invitation.findFirst({
        where: { id: prop.updateProps.id },
      });
      if (!exist) {
        throw new NotFoundException('Post marital not found');
      }

      const updated = await this.prismaService.invitation.update({
        where: { id: prop.updateProps.id },
        data: InvitationMapper.toUpdate(payload),
      });

      return Promise.resolve(InvitationMapper.toDomain(updated));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async findAll(
    prop: FindAllInvitationProps,
  ): Promise<BasePaginatedResponseDTO<InvitationEntity>> {
    try {
      const query = InvitationMapper.toFindAll(prop);
      const [datas, count] = await Promise.all([
        this.prismaService.invitation.findMany(query),
        this.prismaService.invitation.count({
          where: query.where,
        }),
      ]);

      return PaginationHelper.createPaginatedResponse(
        {
          page: prop.page,
          limit: prop.limit,
          search: prop.name,
          baseUrl: 'Invitations',
        },
        datas,
        count,
        (data) => InvitationMapper.toDomain(data),
      );
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async baseDelete(payload: DeleteInvitationProps): Promise<number> {
    try {
      const result = await this.prismaService.invitation.deleteMany({
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
    payload: CreateInvitationProps[],
  ): Promise<InvitationEntity[]> {
    try {
      const promises = payload.map((each) => this.baseCreate(each));

      const results = await Promise.all(promises);

      return results.map((each) => InvitationMapper.toDomain(each));
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async findOne(prop: InvitationProps): Promise<InvitationEntity> {
    try {
      const result = await this.prismaService.invitation.findFirst({
        where: {
          id: prop.findOneProps.id,
        },
        include: this.defaultInclude,
      });
      return Promise.resolve(InvitationMapper.toDomain(result));
    } catch (err) {
      return Promise.reject(err);
    }
  }
}
