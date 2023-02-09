import { Environment } from '../common'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_ENV: Environment
      REACT_APP_VERSION: string
      REACT_APP_BACKEND_URL: string
    }
  }
}
