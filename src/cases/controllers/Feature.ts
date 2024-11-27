import type FeatureService from "../services/Feature"
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
  createFeatureValidation,
  type createFeatureControllerProps
} from "../schema/createFeature"
import {
  searchFeatureValidation,
  type searchFeatureControllerProps
} from "../schema/searchFeature"
import {
  updateFeatureValidation,
  type updateFeatureControllerProps
} from "../schema/updateFeature"

export default class FeatureController {
  constructor(private featureService: FeatureService) { }

  async create(params: createFeatureControllerProps): Promise<defaultResponse> {
    try {
      const validation = await createFeatureValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.featureService.create(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async update(params: updateFeatureControllerProps): Promise<defaultResponse> {
    try {
      const validation = await updateFeatureValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.featureService.update(validation.data)
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

      return await this.featureService.delete(validation.data)
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

      return await this.featureService.getById(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async search(params: searchFeatureControllerProps): Promise<defaultResponse> {
    try {
      const validation = await searchFeatureValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.featureService.search(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async getFeaturesActions(params: getByIdControllerProps): Promise<defaultResponse> {
    try {
      const validation = await getByIdValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.featureService.getFeaturesActions(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
