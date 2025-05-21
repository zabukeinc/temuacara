import {
  BaseMetadataDTO,
  BasePaginatedResponseDTO,
} from '../responses/base.paginated.v2.response';

export interface PaginationProps {
  page?: number;
  limit?: number;
  search?: string;
  baseUrl: string;
}

const DEFAULT_PAGE = Number(process.env.DEFAULT_PAGE) || 1;
const DEFAULT_LIMIT = Number(process.env.DEFAULT_LIMIT) || 25;
const DEFAULT_BASE_URL =
  process.env.DEFAULT_BASE_URL || 'http://localhost:3000/api/v1';

export class PaginationHelper {
  static createPaginatedResponse<T>(
    props: PaginationProps,
    datas: T[],
    count: number,
    transformFn: (data: any) => T,
  ): BasePaginatedResponseDTO<T> {
    const currentPage = Number(props.page) || DEFAULT_PAGE;
    const currentLimit = Number(props.limit) || DEFAULT_LIMIT;
    const total = Math.ceil(count / currentLimit);
    const baseUrl = props.baseUrl || DEFAULT_BASE_URL;

    // Generate next and prev URLs
    const nextPage = currentPage < total ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    const next = nextPage
      ? `${baseUrl}?page=${nextPage}&limit=${currentLimit}`
      : null;
    const prev = prevPage
      ? `${baseUrl}?page=${prevPage}&limit=${currentLimit}`
      : null;

    // Create metadata object
    const metadata: BaseMetadataDTO = {
      page: currentPage,
      limit: datas.length,
      count,
      total,
      next,
      prev,
      query: {
        page: currentPage,
        limit: currentLimit,
        search: props.search,
      },
    };

    return {
      success: true,
      code: 200,
      message: 'Successfully fetch data',
      metadata,
      data: datas.map(transformFn),
    };
  }
}
