import { Paginated } from '@/modules/base/responses/base.paginated';
import { PaginatedResponseDto } from '@/modules/base/responses/base.paginated.response';
import { BaseResponse } from '@/modules/base/responses/base.response';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';

export class GetManyUserReponse extends BaseResponse<UserEntity[]> {
  constructor(datas: UserEntity[]) {
    super(datas);
  }
}

export class GetUserPaginatedResponse extends PaginatedResponseDto<UserEntity> {
  data: readonly UserEntity[];

  constructor(data: Paginated<UserEntity>) {
    super(data);
  }
}
