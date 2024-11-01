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

  async createSystemUser(): Promise<{ create_system_user: number }> {
    try {
      return await this.call<{ create_system_user: number }>(
        "create_system_user"
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async createFirstUser(): Promise<{ create_first_user: number }> {
    try {
      return await this.call<{ create_first_user: number }>("create_first_user")
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async createAdminGroup(): Promise<{ create_admin_group: number }> {
    try {
      return await this.call<{ create_admin_group: number }>(
        "create_admin_group"
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async registerSystemUser(
    systemUserId: number
  ): Promise<{ register_system_user: number }> {
    try {
      return await this.call<{ register_system_user: number }>(
        "register_system_user",
        `${systemUserId}`
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async registerFirstUser(
    firstUserId: number
  ): Promise<{ register_first_user: number }> {
    try {
      return await this.call<{ register_first_user: number }>(
        "register_first_user",
        `${firstUserId}`
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async registerAdminGroup(
    adminGroupId: number
  ): Promise<{ register_admin_group: number }> {
    try {
      return await this.call<{ register_admin_group: number }>(
        "register_admin_group",
        `${adminGroupId}`
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
