import { BaseRepository } from '@/modules/base/repositories/base.repository';
import { PostMaritalResponseEntity } from '../../domain/entities/post-marital.entity';
import {
  CreatePostMaritalProps,
  UpdatePostMaritalProps,
  FindAllPostMaritalProps,
} from '../../domain/types/post-marital.type';

export interface PostMaritalRepository
  extends BaseRepository<
    PostMaritalResponseEntity,
    CreatePostMaritalProps,
    UpdatePostMaritalProps,
    unknown,
    FindAllPostMaritalProps,
    PostMaritalProps
  > {
  baseUpdate(
    prop: PostMaritalProps,
    payload: UpdatePostMaritalProps,
  ): Promise<PostMaritalResponseEntity>;
}

export interface PostMaritalProps {
  updateProps?: { id: string };
  deleteProps?: { id: string };
}
