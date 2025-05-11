import { PaginatedResponseDto } from '../responses/base.paginated.response';

export interface BaseRepository<
  Entity,
  CreateProps = unknown,
  UpdateProps = unknown,
  DeleteProps = unknown,
  FindAllProps = unknown,
> {
  baseCreate(prop: CreateProps): Promise<Entity>;
  baseUpdate(prop: UpdateProps, payload: Entity): Promise<Entity>;
  baseDelete(prop: DeleteProps): Promise<Entity>;
  findAll(prop: FindAllProps): Promise<PaginatedResponseDto<Entity>>;
}
