import { postgresArray, Repository } from "../types"

export default class PermissionRepository extends Repository {
  async create(params: {
    userId: number
    featureId: number
    createdBy: number
    actions: number[]
  }): Promise<{ create_permission: number }> {
    try {
      return await this.call<{ create_permission: number }>(
        "create_permission",
        params.userId,
        params.featureId,
        params.createdBy,
        postgresArray(params.actions.toString())
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getPermissions(params: { userId: number }): Promise<
    {
      featureid: number
      featurename: string
      featureicon: string
      featurepath: string
      featurecanonical: string
      devicecomponentId: number
      devicename: string
      featuredeviceid: number
      actions: { id: number; name: string; canonical: string }[]
    }[]
  > {
    try {
      return await this.list<
        {
          featureid: number
          featurename: string
          featureicon: string
          featurepath: string
          featurecanonical: string
          devicecomponentId: number
          devicename: string
          featuredeviceid: number
          actions: { id: number; name: string; canonical: string }[]
        }[]
      >("get_permissions", params.userId)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getAdminPermissions(): Promise<
    {
      featureid: number
      featurename: string
      featureicon: string
      featurepath: string
      featurecanonical: string
      devicecomponentId: number
      devicename: string
      featuredeviceid: number
      actions: { id: number; name: string; canonical: string }[]
    }[]
  > {
    try {
      return await this.list<
        {
          featureid: number
          featurename: string
          featureicon: string
          featurepath: string
          featurecanonical: string
          devicecomponentId: number
          devicename: string
          featuredeviceid: number
          actions: { id: number; name: string; canonical: string }[]
        }[]
      >("get_admins_permission")
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
