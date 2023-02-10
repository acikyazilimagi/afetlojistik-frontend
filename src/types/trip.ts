import { ChangeLogType } from './changeLog'
import { LocationType } from './location'
import { ProductType } from './product'
import { VehicleType } from './vehicle'

export type TripType = {
  _id: string
  tripNumber: number
  organizationId: string
  vehicle: VehicleType
  fromLocation: LocationType
  toLocation: LocationType
  //   TODO
  //   createdBy: UserType
  createdBy: string
  statusChangeLog: ChangeLogType[]
  estimatedDepartTime: string
  products: ProductType[]
  createdAt: string
  updatedAt: string
}
