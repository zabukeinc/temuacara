import { BaseRepository } from '@/modules/base/repositories/base.repository';
import { PostMaritalEntity } from '../../domain/entities/post-marital.entity';
import {
  CreatePostMaritalProps,
  UpdatePostMaritalProps,
  FindAllPostMaritalProps,
} from '../../domain/types/post-marital.type';

export interface PostMaritalRepository
  extends BaseRepository<
    PostMaritalEntity,
    CreatePostMaritalProps,
    UpdatePostMaritalProps,
    unknown,
    FindAllPostMaritalProps
  > {}

export interface PostMaritalProps {
  updateProps?: { id: string };
  deleteProps?: { id: string };
}
