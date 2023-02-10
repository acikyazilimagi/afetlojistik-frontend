export type UserType = {
  roles: unknown[]
  _id: string
  active: boolean
  name: string
  surname: string
  phone: string
}

export type LoginResponseType = {
  success: boolean
}

export type VerifyAuthCodeResponseType = {
  user: UserType
  token: string
}
