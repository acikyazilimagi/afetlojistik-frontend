import { CityType } from 'types/city'
import { http } from 'services/http'

export const getCityList = (): Promise<CityType[]> => http.get('location/cities')
