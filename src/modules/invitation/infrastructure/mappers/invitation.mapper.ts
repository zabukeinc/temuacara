import {
  InvitationStatusEnum,
  InvitationTypeEnum,
  Prisma,
  WebsiteTrackEnum,
  WeddingRoleEnum,
} from '@prisma/client';
import {
  CreateInvitationProps,
  FindAllInvitationProps,
  InvitationRelationed,
  UpdateInvitationProps,
} from '../../domain/types/invitation.type';

export class InvitationMapper {
  static toCreate(
    props: CreateInvitationProps,
  ): Prisma.InvitationUncheckedCreateInput {
    return {
      inviter: props.inviter,
      name: props.name,
      status: props.status,
      pax: props.pax,
      type: props.type,
      priority: props.priority,
      invitation_website: {
        create: {
          url: props.website.url,
          feature: props.website.features,
          track: props.website.track,
          expired_at: props.website.expired_at,
          sent_at: props.website.sent_at,
          opened_at: props.website.opened_at,
        },
      },
      invitation_info: {
        create: {
          email: props.info.email,
          address: props.info.address,
          from: props.info.from,
          phone: props.info.phone,
          invitation_category: {
            connectOrCreate: {
              create: { name: props.info.category },
              where: { name: props.info.category },
            },
          },
        },
      },
    };
  }

  static toDomain(model: InvitationRelationed): InvitationRelationed {
    return model;
  }

  static toUpdate(props: UpdateInvitationProps): Prisma.InvitationUpdateInput {
    const updates: Prisma.InvitationUpdateInput = {};

    if (props.inviter) updates.inviter = props.inviter;
    if (props.name) updates.name = props.name;
    if (props.status) updates.status = props.status;
    if (typeof props.pax === 'number') updates.pax = props.pax;
    if (props.type) updates.type = props.type;
    if (typeof props.priority === 'number') updates.priority = props.priority;

    if (props.website) {
      updates.invitation_website = {
        update: {
          ...(props.website.url && { url: props.website.url }),
          ...(props.website.features && { feature: props.website.features }),
          ...(props.website.track && { track: props.website.track }),
          ...(props.website.expired_at && {
            expired_at: props.website.expired_at,
          }),
          ...(props.website.sent_at && { sent_at: props.website.sent_at }),
          ...(props.website.opened_at && {
            opened_at: props.website.opened_at,
          }),
        },
      };
    }

    if (props.info) {
      updates.invitation_info = {
        update: {
          ...(props.info.email && { email: props.info.email }),
          ...(props.info.address && { address: props.info.address }),
          ...(props.info.from && { from: props.info.from }),
          ...(props.info.phone && { phone: props.info.phone }),
          ...(props.info.category && {
            invitation_category: {
              connectOrCreate: {
                where: { name: props.info.category },
                create: { name: props.info.category },
              },
            },
          }),
        },
      };
    }

    return updates;
  }

  static toFindAll(
    props: FindAllInvitationProps,
  ): Prisma.InvitationFindManyArgs {
    const page = Number(props.page) || 1;
    const limit = Number(props.limit) || 25;
    const sortBy = props.sort_by ?? 'created_at';
    const sortDirection = props.sort_direction ?? 'desc';

    const aggregate: Prisma.InvitationFindManyArgs = {
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: sortDirection,
      },
      include: {
        invitation_info: {
          include: {
            invitation_category: true,
          },
        },
        invitation_website: true,
      },
    };

    const query: Prisma.InvitationWhereInput = {};

    if (props.status) {
      query.status = {
        in: [props.status as InvitationStatusEnum],
      };
    }

    if (props.type) {
      query.type = {
        in: [props.type as InvitationTypeEnum],
      };
    }

    if (props.website_track) {
      query.invitation_website = {
        track: {
          in: [props.website_track as WebsiteTrackEnum],
        },
      };
    }

    if (props.inviter) {
      query.inviter = {
        in: [props.inviter as WeddingRoleEnum],
      };
    }

    if (props.from) {
      query.invitation_info = {
        from: {
          contains: props.from,
        },
      };
    }

    if (props.search) {
      query.name = { contains: props.search, mode: 'insensitive' };
    }

    aggregate.where = query;
    return aggregate;
  }
}
