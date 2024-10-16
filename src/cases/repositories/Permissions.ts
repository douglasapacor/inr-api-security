import { postgresArrayTreatment, Repository } from "../types"
export enum permissionsProcedures {
  create = "create_permission",
  getPermissions = "get_permissions",
  getAdminsPermissions = "get_admins_permission"
}
export default class PermissionRepository extends Repository {
  async create(params: {
    userId: number
    featureId: number
    createdBy: number
    actions: number[]
  }): Promise<{ create_permission: number }> {
    try {
      return await this.call<{ create_permission: number }>(
        permissionsProcedures.create,
        params.userId,
        params.featureId,
        params.createdBy,
        postgresArrayTreatment(params.actions.toString())
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
      >(permissionsProcedures.getPermissions, params.userId)
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
      >(permissionsProcedures.getAdminsPermissions)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
