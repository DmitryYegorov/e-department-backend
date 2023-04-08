export interface Response<T> {
  success: boolean;
  data: T;
}

export interface List<T> {
  list: T[]
}
