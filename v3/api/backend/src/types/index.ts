import type { Pagination } from "../lib/query";

export type Result<T> =
  | {
      success: true;
      data: T;
      pagination?: Pagination;
    }
  | {
      success: false;
      error: {
        code: string;
        message: string;
      };
    };