import { ChangeLogType } from './changeLog'
import { LocationType } from './location'
import { ProductType } from './product'
import { UserType } from './user'
import { VehicleType } from './vehicle'

export type TripType = {
  _id: string
  tripNumber: number
  organizationId: string
  vehicle: VehicleType
  fromLocation: LocationType
  toLocation: LocationType
  createdBy: UserType
  statusChangeLog: ChangeLogType[]
  estimatedDepartTime: string
  products: ProductType[]
  createdAt: string
  updatedAt: string
}

export type CreateTripFormType = {
  vehicle: VehicleType
  fromLocation: LocationType
}
