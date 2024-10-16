import type ActionService from "../services/Action"
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
  createActionValidation,
  type createActionControllerProps
} from "../schema/createAction"
import {
  searchActionValidation,
  type searchActionControllerProps
} from "../schema/searchAction"
import {
  updateActionValidation,
  type updateActionControllerProps
} from "../schema/updateAction"

export default class ActionController {
  constructor(private actionComponentService: ActionService) {}

  async create(params: createActionControllerProps): Promise<defaultResponse> {
    try {
      const validation = await createActionValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.actionComponentService.create(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async update(params: updateActionControllerProps): Promise<defaultResponse> {
    try {
      const validation = await updateActionValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.actionComponentService.update(validation.data)
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

      return await this.actionComponentService.delete(validation.data)
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

      return await this.actionComponentService.getById(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async search(params: searchActionControllerProps): Promise<defaultResponse> {
    try {
      const validation = await searchActionValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.actionComponentService.search(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
