import { postgresStringfy, Repository } from "../types"

export default class ActionRepository extends Repository {
  async create(params: {
    name: string
    canonical: string
    createdBy: number
  }): Promise<{ create_action: number }> {
    try {
      return await this.call<{ create_action: number }>(
        "create_action",
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
        "update_action",
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
      }>("get_action_by_id", params.id)
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
        "delete_action",
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
        "search_action",
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
        "count_action",
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
        "get_feature_action",
        params.featureId
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
