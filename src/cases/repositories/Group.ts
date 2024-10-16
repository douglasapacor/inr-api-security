import { postgresArrayTreatment, postgresStringfy, Repository } from "../types"

export enum groupProcedures {
  create = "create_group",
  update = "update_group",
  getById = "get_group_by_id",
  delete = "delete_group",
  search = "search_group",
  count = "count_group"
}

export default class GroupRepository extends Repository {
  async create(params: {
    name: string
    canonical: string
    color?: string
    active: boolean
    super: boolean
    createdById: number
    features: number[]
  }): Promise<{ create_group: number }> {
    try {
      return await this.call<{ create_group: number }>(
        groupProcedures.create,
        postgresStringfy(params.name),
        postgresStringfy(params.canonical),
        postgresStringfy(params.color || ""),
        params.active,
        params.super,
        params.createdById,
        postgresArrayTreatment(params.features.toString())
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async update(params: {
    id: number
    name: string
    canonical: string
    color?: string
    active: boolean
    super: boolean
    updatedBy: number
    features: number[]
  }): Promise<{ update_group: number }> {
    try {
      return await this.call<{ update_group: number }>(
        groupProcedures.update,
        params.id,
        postgresStringfy(params.name),
        postgresStringfy(params.canonical),
        postgresStringfy(params.color || ""),
        params.active,
        params.super,
        params.updatedBy,
        postgresArrayTreatment(params.features.toString())
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getById(params: { id: number }): Promise<{
    id: number
    name: string
    canonical: string
    color: string
    active: boolean
    super: boolean
    createdbyid: number
    createdname: string
    createdat: Date
    updatedbyid: number
    updatedname: string
    updatedat: Date
  }> {
    try {
      return await this.call<{
        id: number
        name: string
        canonical: string
        color: string
        active: boolean
        super: boolean
        createdbyid: number
        createdname: string
        createdat: Date
        updatedbyid: number
        updatedname: string
        updatedat: Date
      }>(groupProcedures.getById, params.id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async delete(params: {
    id: number
    deletedBy: number
  }): Promise<{ delete_group: number }> {
    try {
      return await this.call<{ delete_group: number }>(
        groupProcedures.delete,
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
    color: string
    active: boolean
    super: boolean
    limit: number
    offset: number
  }): Promise<
    {
      id: number
      name: string
      canonical: string
      color: string
      active: boolean
      icon: string
      super: boolean
    }[]
  > {
    try {
      return await this.list<
        {
          id: number
          name: string
          canonical: string
          color: string
          active: boolean
          icon: string
          super: boolean
        }[]
      >(
        groupProcedures.search,
        postgresStringfy(params.name),
        postgresStringfy(params.canonical),
        postgresStringfy(params.color),
        params.active,
        params.super,
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
    color?: string
    active: boolean
    super: boolean
  }): Promise<{ count_group: number }> {
    try {
      return await this.call<{ count_group: number }>(
        groupProcedures.count,
        postgresStringfy(params.name),
        postgresStringfy(params.canonical),
        postgresStringfy(params.color || ""),
        params.active,
        params.super
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
