export type UserType = {
  active: boolean
  createdAt: string
  email: string
  isAdmin: boolean
  name: string
  organizationId: string
  phone: string
  roles: unknown[]
  status: 100
  surname: string
  updatedAt: string
  _id: string
}

export type LoginResponseType = {
  active: boolean
  createdAt: string
  email: string
  isAdmin: boolean
  name: string
  organizationId: string
  phone: string
  roles: unknown[]
  status: 100
  surname: string
  updatedAt: string
  _id: string
}

export type VerifyAuthCodeResponseType = {
  user: UserType
  token: string
}
