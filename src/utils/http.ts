import { ResponseData } from 'types/http'

export const transformResponseData = <T>(response: ResponseData<T>) => response.data
