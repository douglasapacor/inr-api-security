import { Repository } from "../types"

export default class ApplicationParamsRepository extends Repository {
  async getApplicationParams(): Promise<{ key: string; value: string }[]> {
    try {
      return await this.list<{ key: string; value: string }[]>(
        "get_application_params"
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async createSystemUser(): Promise<void> {
    try {
      return await this.call<void>("create_system_user")
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async createFirtUser(): Promise<void> {
    try {
      return await this.call<void>("create_first_user")
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
