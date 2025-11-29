export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export type Id = number | string;
