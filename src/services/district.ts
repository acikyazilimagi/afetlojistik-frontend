import { CityType } from 'types/city'
import { http } from 'services/http'

export const getDistrictList = (cityId: string): Promise<CityType[]> =>
  http.get('location/cities', { params: { cityId } })
