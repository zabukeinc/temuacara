import { BaseRepository } from '@/modules/base/repositories/base.repository';
import { PostMaritalResponseEntity } from '../../domain/entities/post-marital.entity';
import {
  CreatePostMaritalProps,
  UpdatePostMaritalProps,
  FindAllPostMaritalProps,
  DeletePostMaritalProps,
} from '../../domain/types/post-marital.type';

export interface PostMaritalRepository
  extends BaseRepository<
    PostMaritalResponseEntity,
    CreatePostMaritalProps,
    UpdatePostMaritalProps,
    DeletePostMaritalProps,
    FindAllPostMaritalProps,
    PostMaritalProps
  > {
  baseUpdate(
    prop: PostMaritalProps,
    payload: UpdatePostMaritalProps,
  ): Promise<PostMaritalResponseEntity>;
}

export interface PostMaritalProps {
  updateProps?: { id: number };
  deleteProps?: { id: number };
}
