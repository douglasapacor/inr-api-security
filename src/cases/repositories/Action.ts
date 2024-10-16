import { postgresStringfy, Repository } from "../types"

export enum actionProcedures {
  create = "create_action",
  update = "update_action",
  getById = "get_action_by_id",
  delete = "delete_action",
  search = "search_action",
  count = "count_action",
  getFeatureAction = "get_feature_action"
}

export default class ActionRepository extends Repository {
  async create(params: {
    name: string
    canonical: string
    createdBy: number
  }): Promise<{ create_action: number }> {
    try {
      return await this.call<{ create_action: number }>(
        actionProcedures.create,
        postgresStringfy(params.name),
        postgresStringfy(params.canonical),
        params.createdBy
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async update(params: {
    id: number
    name: string
    canonical: string
    updatedBy: number
  }): Promise<{ update_action: number }> {
    try {
      return await this.call<{ update_action: number }>(
        actionProcedures.update,
        params.id,
        postgresStringfy(params.name),
        postgresStringfy(params.canonical),
        params.updatedBy
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getById(params: { id: number }): Promise<{
    id: number
    name: string
    canonical: string
    createdid: number
    createdname: string
    createdat: string
    updatedid: number
    updatedname: string
    updatedat: string
  }> {
    try {
      return await this.call<{
        id: number
        name: string
        canonical: string
        createdid: number
        createdname: string
        createdat: string
        updatedid: number
        updatedname: string
        updatedat: string
      }>(actionProcedures.getById, params.id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async delete(params: {
    id: number
    deletedBy: number
  }): Promise<{ delete_action: number }> {
    try {
      return await this.call<{ delete_action: number }>(
        actionProcedures.delete,
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
    limit: number
    offset: number
  }): Promise<{ id: number; name: string; canonical: string }[]> {
    try {
      return await this.list<{ id: number; name: string; canonical: string }[]>(
        actionProcedures.search,
        postgresStringfy(params.name),
        postgresStringfy(params.canonical),
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
  }): Promise<{ count_action: number }> {
    try {
      return await this.call<{ count_action: number }>(
        actionProcedures.count,
        postgresStringfy(params.name),
        postgresStringfy(params.canonical)
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getFeatureAction(params: {
    featureId: number
  }): Promise<{ id: number; name: string }[]> {
    try {
      return await this.list<{ id: number; name: string }[]>(
        actionProcedures.getFeatureAction,
        params.featureId
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
