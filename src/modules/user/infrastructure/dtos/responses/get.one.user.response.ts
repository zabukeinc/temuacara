import { BaseResponse } from '@/modules/base/responses/base.response';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';

export class GetOneUserResponse extends BaseResponse<UserEntity> {
  constructor(data: UserEntity) {
    super(data);
  }
}
