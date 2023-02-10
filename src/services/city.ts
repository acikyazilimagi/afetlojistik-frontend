import { CityType } from 'types/city'
import { http } from 'services/http'
import { transformResponseData } from 'utils/http'

export const getCityList = (): Promise<CityType[]> => http.get('location/cities').then(transformResponseData)
