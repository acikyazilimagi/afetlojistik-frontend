import { http } from 'services/http'
import { transformResponseData } from 'utils/http'
import { ProductCategoryType } from 'types/productCategoryType'

export const getProductCategoryList = (): Promise<ProductCategoryType[]> =>
  http.get('category').then(transformResponseData)
