import { Dayjs } from 'dayjs'
import { TripsStatuses } from 'constants/trip'
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
  status: TripsStatuses
  estimatedDepartTime: string
  products: ProductType[]
  createdAt: string
  updatedAt: string
}

export type EditTripStatusFormType = {
  tripId?: string
  status?: TripsStatuses
}

export type CreateFormLocationType = {
  cityId: string
  districtId: string
}

export type CreateTripFormType = {
  vehicle: VehicleType
  fromLocation: CreateFormLocationType
  toLocation: CreateFormLocationType
  destinationAddress?: string
  estimatedDepartTime: string
  notes?: string
  products: Omit<ProductType, 'categoryName'>[]
}

export interface TripListFilterPostType {
  id: number
  title: string
  content: string
  status: TripsStatuses
  category: { id: number }
}

export type TripListFilterTypes = {
  tripNumbers: string[]
  fromCityIds: string[]
  toCityIds: string[]
  statuses: number[]
  createdAt: [Dayjs, Dayjs]
}
