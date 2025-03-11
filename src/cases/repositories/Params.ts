import { postgresStringfy, Repository } from "../types"

export default class ParamsRepository extends Repository {
  async getApplicationParams(): Promise<{ name: string; value: string }[]> {
    try {
      return await this.list<{ name: string; value: string }[]>(
        "get_application_params"
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateParams(params: {
    value: string
    name: string
  }): Promise<{ update_params: number }> {
    try {
      return await this.call<{ update_params: number }>(
        "update_params",
        postgresStringfy(params.name),
        postgresStringfy(params.value)
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
