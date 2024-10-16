import { postgresStringfy, Repository } from "../types"

export enum applicationParamsProcedures {
  getApplicationParams = "get_application_params",
  createSystemUser = "create_system_user",
  createfirstUser = "create_first_user"
}

export default class ApplicationParamsRepository extends Repository {
  async getApplicationParams(): Promise<{ key: string; value: string }[]> {
    try {
      return await this.list<{ key: string; value: string }[]>(
        applicationParamsProcedures.getApplicationParams
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async createSystemUser(): Promise<void> {
    try {
      return await this.call<void>(applicationParamsProcedures.createSystemUser)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async createFirtUser(): Promise<void> {
    try {
      return await this.call<void>(applicationParamsProcedures.createfirstUser)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
