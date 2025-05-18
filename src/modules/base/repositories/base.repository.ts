import { BasePaginatedResponseDTO } from '../responses/base.paginated.v2.response';

export interface BaseRepository<
  Entity,
  CreateProps = unknown,
  UpdateProps = unknown,
  DeleteProps = unknown,
  FindAllProps = unknown,
  WhereObject = unknown,
> {
  baseCreate(prop: CreateProps): Promise<Entity>;
  baseUpdate(prop: WhereObject, payload: UpdateProps): Promise<Entity>;
  baseDelete(payload: DeleteProps): Promise<number>;
  findAll(prop: FindAllProps): Promise<BasePaginatedResponseDTO<Entity>>;
  findOne(prop: WhereObject): Promise<Entity>;
}
