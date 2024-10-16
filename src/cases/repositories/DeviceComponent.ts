import { postgresStringfy, Repository } from "../types"

export enum deviceComponentProcedures {
  create = "create_device_component",
  update = "update_device_component",
  getById = "get_device_component_by_id",
  delete = "delete_device_component",
  search = "search_device_component",
  count = "count_device_component"
}

export default class DeviceComponentRepository extends Repository {
  async create(params: {
    name: string
    deviceId: number
    createdBy: number
  }): Promise<{ create_device_component: number }> {
    try {
      return await this.call<{
        create_device_component: number
      }>(
        deviceComponentProcedures.create,
        postgresStringfy(params.name),
        params.deviceId,
        params.createdBy
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async update(params: {
    id: number
    name: string
    deviceId: number
    updatedBy: number
  }): Promise<{ update_device_component: number }> {
    try {
      return await this.call<{ update_device_component: number }>(
        deviceComponentProcedures.update,
        params.id,
        postgresStringfy(params.name),
        params.deviceId,
        params.updatedBy
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async delete(params: {
    id: number
    deletedBy: number
  }): Promise<{ delete_device_component: number }> {
    try {
      return await this.call<{ delete_device_component: number }>(
        deviceComponentProcedures.delete,
        params.id,
        params.deletedBy
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getById(params: { id: number }): Promise<{
    id: number
    name: string
    deviceid: number
    createdat: Date
    createdbyid: bigint
    createdname: string
    updatedat?: Date
    updatedbyid?: bigint
    updatedname?: string
  }> {
    try {
      return await this.call<{
        id: number
        name: string
        deviceid: number
        createdat: Date
        createdbyid: bigint
        createdname: string
        updatedat?: Date
        updatedbyid?: bigint
        updatedname?: string
      }>(deviceComponentProcedures.getById, params.id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async search(params: {
    name: string
    deviceId: number | "NULL"
    limit: number
    offset: number
  }): Promise<
    {
      id: number
      name: string
      deviceId: number
    }[]
  > {
    try {
      return await this.list<
        {
          id: number
          name: string
          deviceId: number
        }[]
      >(
        deviceComponentProcedures.search,
        postgresStringfy(params.name),
        params.deviceId,
        params.limit,
        params.offset
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async count(params: {
    name: string
    deviceId: number | "NULL"
  }): Promise<{ count_device_component: number }> {
    try {
      return await this.call<{ count_device_component: number }>(
        deviceComponentProcedures.count,
        postgresStringfy(params.name),
        params.deviceId
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
