import type GroupService from "../services/Group"
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
  createGroupValidation,
  type createGroupControllerProps
} from "../schema/createGroup"
import {
  searchGroupValidation,
  type searchGroupControllerProps
} from "../schema/searchGroup"
import {
  updateGroupValidation,
  type updateGroupControllerProps
} from "../schema/updateGroup"

export default class GroupController {
  constructor(private groupService: GroupService) {}

  async create(params: createGroupControllerProps): Promise<defaultResponse> {
    try {
      const validation = await createGroupValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.groupService.create(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async update(params: updateGroupControllerProps): Promise<defaultResponse> {
    try {
      const validation = await updateGroupValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.groupService.update(validation.data)
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

      return await this.groupService.delete(validation.data)
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

      return await this.groupService.getById(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async search(params: searchGroupControllerProps): Promise<defaultResponse> {
    try {
      const validation = await searchGroupValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.groupService.search(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
