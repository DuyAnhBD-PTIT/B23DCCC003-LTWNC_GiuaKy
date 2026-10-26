export interface ApiSuccess<T> {
  ok: true;
  data: T;
}

export interface ApiFailure {
  ok: false;
  error: string;
}

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

export function isSuccess<T>(result: ApiResult<T>): result is ApiSuccess<T> {
  return result.ok;
}

export function isFailure<T>(result: ApiResult<T>): result is ApiFailure {
  return !result.ok;
}
