import { postgresObjectArray, postgresStringfy, Repository } from "../types"

export default class GroupRepository extends Repository {
  async create(params: {
    name: string
    canonical: string
    color?: string
    active: boolean
    super: boolean
    createdById: number
    features: { id: number; free: boolean }[]
  }): Promise<{ create_group: number }> {
    try {
      return await this.call<{ create_group: number }>(
        "create_group",
        postgresStringfy(params.name),
        postgresStringfy(params.canonical),
        postgresStringfy(params.color || ""),
        params.active,
        params.super,
        params.createdById,
        postgresObjectArray(params.features)
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
    features: { id: number; free: boolean }[]
  }): Promise<{ update_group: number }> {
    try {
      return await this.call<{ update_group: number }>(
        "update_group",
        params.id,
        postgresStringfy(params.name),
        postgresStringfy(params.canonical),
        postgresStringfy(params.color || ""),
        params.active,
        params.super,
        params.updatedBy,
        postgresObjectArray(params.features)
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
      }>("get_group_by_id", params.id)
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
        "delete_group",
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
          super: boolean
        }[]
      >(
        "search_group",
        postgresStringfy(params.name),
        postgresStringfy(params.canonical),
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
        "count_group",
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

  async initializeGroup(): Promise<{ initialize_group: number }> {
    try {
      return this.call("initialize_group")
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
