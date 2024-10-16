import type DeviceComponentRepository from "../repositories/DeviceComponent"
import type { defaultResponse } from "../types"
import type { commonDeleteServiceProps } from "../schema/commomDelete"
import type { getByIdServiceProps } from "../schema/commomGetById"
import type { createDeviceComponentServiceProps } from "../schema/createDeviceComponent"
import type { searchDeviceComponentsServiceProps } from "../schema/searchDeviceComponents"
import type { updateDeviceComponentServiceProps } from "../schema/updateDeviceComponent"

export default class DeviceComponentService {
  constructor(private deviceComponentRepository: DeviceComponentRepository) {}

  async create(
    params: createDeviceComponentServiceProps
  ): Promise<defaultResponse> {
    try {
      const deviceComponent = await this.deviceComponentRepository.create(
        params
      )
      return {
        success: true,
        message: "Device criado com sucesso.",
        data: {
          id: deviceComponent.create_device_component,
          name: params.name,
          deviceId: params.deviceId
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async update(
    params: updateDeviceComponentServiceProps
  ): Promise<defaultResponse> {
    try {
      const response = await this.deviceComponentRepository.update(params)
      if (response.update_device_component <= 0)
        throw new Error("Não houve alterações")

      return {
        success: true,
        message: "Device editado com sucesso.",
        data: {
          id: params.id,
          deviceId: params.deviceId,
          name: params.name
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async delete(params: commonDeleteServiceProps): Promise<defaultResponse> {
    try {
      const response = await this.deviceComponentRepository.delete(params)
      if (response.delete_device_component <= 0)
        throw new Error("Não houve alterações")

      return {
        success: true,
        message: "Device excluido com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async getById(params: getByIdServiceProps): Promise<defaultResponse> {
    try {
      const device = await this.deviceComponentRepository.getById({
        id: params.id
      })

      if (!device) throw new Error("Device não encontrado.")

      return {
        success: true,
        data: {
          id: device.id,
          name: device.name,
          deviceId: device.deviceid,
          createdById: device.createdbyid,
          createdName: device.createdname,
          createdAt: device.createdat,
          updatedAt: device.updatedat,
          updatedById: device.updatedbyid,
          updatedName: device.updatedname
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async search(
    params: searchDeviceComponentsServiceProps
  ): Promise<defaultResponse> {
    try {
      const response = await this.deviceComponentRepository.search(params)
      const count = await this.deviceComponentRepository.count(params)

      return {
        success: true,
        data: {
          list: response,
          count: count.count_device_component
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
