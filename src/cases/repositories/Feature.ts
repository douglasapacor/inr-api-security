import { postgresArrayTreatment, postgresStringfy, Repository } from "../types"

export enum featureProcedures {
  create = "create_feature",
  update = "update_feature",
  getById = "get_feature_by_id",
  delete = "delete_feature",
  search = "search_feature",
  count = "count_feature",
  getGroupFeature = "get_group_feature"
}

export class FeatureRepository extends Repository {
  async create(params: {
    name: string
    canonical: string
    active: boolean
    path?: string | undefined
    icon?: string | undefined
    visible: boolean
    deviceComponentsId?: number | undefined
    createdBy: number
    actions: number[]
  }): Promise<{ create_feature: number }> {
    try {
      return await this.call<{ create_feature: number }>(
        featureProcedures.create,
        postgresStringfy(params.name),
        postgresStringfy(params.canonical),
        params.active,
        postgresStringfy(params.icon || "NULL"),
        postgresStringfy(params.path || "NULL"),
        params.visible,
        params.deviceComponentsId,
        params.createdBy,
        postgresArrayTreatment(params.actions.toString())
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async update(params: {
    id: number
    name: string
    canonical: string
    active: boolean
    path?: string
    icon?: string
    visible: boolean
    deviceComponentsId: number | "NULL"
    updatedBy: number
    actions: number[]
  }): Promise<{ update_feature: number }> {
    try {
      return await this.call<{ update_feature: number }>(
        featureProcedures.update,
        params.id,
        postgresStringfy(params.name),
        postgresStringfy(params.canonical),
        params.active,
        postgresStringfy(params.icon || ""),
        postgresStringfy(params.path || ""),
        params.visible,
        params.deviceComponentsId,
        params.updatedBy,
        postgresArrayTreatment(params.actions.toString())
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getById(params: { id: number }): Promise<{
    id: number
    name: string
    canonical: string
    active: boolean
    path: string
    icon: string
    visible: boolean
    deviceComponentsId: number
    deviceName: string
    createdById: number
    createdName: string
    createdAt: Date
    updatedById: number
    updatedName: string
    updatedAt: Date
  }> {
    try {
      return await this.call<{
        id: number
        name: string
        canonical: string
        active: boolean
        path: string
        icon: string
        visible: boolean
        deviceComponentsId: number
        deviceName: string
        createdById: number
        createdName: string
        createdAt: Date
        updatedById: number
        updatedName: string
        updatedAt: Date
      }>(featureProcedures.getById, params.id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async delete(params: {
    id: number
    deletedBy: number
  }): Promise<{ delete_feature: number }> {
    try {
      return await this.call<{ delete_feature: number }>(
        featureProcedures.delete,
        params.id,
        params.deletedBy
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async search(params: {
    name: string
    canonical: string
    active: boolean
    icon: string
    path: string
    visible: boolean
    deviceComponentsId: number | "NULL"
    limit: number
    offset: number
  }): Promise<
    {
      id: number
      name: string
      code: string
      active: boolean
      icon: string
      path: string
      visible: boolean
      deviceComponentsId: number
      deviceComponentsName: string
    }[]
  > {
    try {
      return await this.list<
        {
          id: number
          name: string
          code: string
          active: boolean
          icon: string
          path: string
          visible: boolean
          deviceComponentsId: number
          deviceComponentsName: string
        }[]
      >(
        featureProcedures.search,
        postgresStringfy(params.name),
        postgresStringfy(params.canonical),
        params.active,
        postgresStringfy(params.icon),
        postgresStringfy(params.path),
        params.visible,
        params.deviceComponentsId,
        params.limit,
        params.offset
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async count(params: {
    name: string
    canonical: string
    active: boolean
    path: string
    icon: string
    visible: boolean
    deviceComponentsId: number | "NULL"
  }): Promise<{ count_feature: number }> {
    try {
      return await this.call<{ count_feature: number }>(
        featureProcedures.count,
        postgresStringfy(params.name),
        postgresStringfy(params.canonical),
        params.active,
        postgresStringfy(params.icon),
        postgresStringfy(params.path),
        params.visible,
        params.deviceComponentsId
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getGroupFeatures(params: {
    groupId: number
  }): Promise<{ id: number; name: string }[]> {
    try {
      return await this.list<{ id: number; name: string }[]>(
        featureProcedures.getGroupFeature,
        params.groupId
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
