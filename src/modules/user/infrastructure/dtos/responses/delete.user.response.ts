import { BaseResponse } from '@/modules/base/responses/base.response';

export class DeleteUserResponse extends BaseResponse<boolean> {
  constructor(deleteResult: boolean) {
    super(deleteResult);
  }
}
