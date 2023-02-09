export type UserType = {
  roles: unknown[]
  _id: string
  active: boolean
  name: string
  surname: string
  phone: string
}

export type UserLoginResponseType = {
  user: UserType
  token: string
}
