import type DeviceComponentService from "../services/DeviceComponent"
import type { defaultResponse } from "../types"
import {
  commonDeleteValidation,
  type commonDeleteControllerProps
} from "../schema/commomDelete"
import {
  getByIdValidation,
  type getByIdControllerProps
} from "../schema/commomGetById"
import {
  createDeviceComponentValidation,
  type createDeviceComponentControllerProps
} from "../schema/createDeviceComponent"
import {
  searchDeviceComponentsValidation,
  type searchDeviceComponentsControllerProps
} from "../schema/searchDeviceComponents"
import {
  updateDeviceComponentValidation,
  type updateDeviceComponentControllerProps
} from "../schema/updateDeviceComponent"

export default class DeviceComponentController {
  constructor(private deviceComponentService: DeviceComponentService) {}

  async create(
    params: createDeviceComponentControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await createDeviceComponentValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.deviceComponentService.create(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async update(
    params: updateDeviceComponentControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await updateDeviceComponentValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.deviceComponentService.update(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async delete(params: commonDeleteControllerProps): Promise<defaultResponse> {
    try {
      const validation = await commonDeleteValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.deviceComponentService.delete(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async getById(params: getByIdControllerProps): Promise<defaultResponse> {
    try {
      const validation = await getByIdValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.deviceComponentService.getById(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async search(
    params: searchDeviceComponentsControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await searchDeviceComponentsValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.deviceComponentService.search(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
