import type { FeatureRepository } from "../repositories/Feature"
import type { defaultResponse } from "../types"
import type { commonDeleteServiceProps } from "../schema/commomDelete"
import type { getByIdServiceProps } from "../schema/commomGetById"
import type { createFeatureServiceProps } from "../schema/createFeature"
import type { searchFeatureServiceProps } from "../schema/searchFeature"
import type { updateFeatureServiceProps } from "../schema/updateFeature"
import type ActionRepository from "../repositories/Action"

export default class FeatureService {
  constructor(
    private featureRepository: FeatureRepository,
    private actionRepository: ActionRepository
  ) {}

  async create(params: createFeatureServiceProps): Promise<defaultResponse> {
    try {
      const feature = await this.featureRepository.create(params)
      return {
        success: true,
        message: "Recurso criado com sucesso.",
        data: { id: feature.create_feature, ...params }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async update(params: updateFeatureServiceProps): Promise<defaultResponse> {
    try {
      const response = await this.featureRepository.update(params)
      if (response.update_feature <= 0) throw new Error("Não houve alterações")

      return {
        success: true,
        message: "Recurso editado com sucesso."
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
      const device = await this.featureRepository.getById({
        id: params.id
      })
      const actions = await this.actionRepository.getFeatureAction({
        featureId: params.id
      })

      if (!device) throw new Error("Recurso não encontrado.")

      return {
        success: true,
        data: {
          id: device.id,
          name: device.name,
          canonical: device.canonical,
          active: device.active,
          path: device.path,
          icon: device.icon,
          visible: device.visible,
          deviceComponentsId: device.deviceComponentsId,
          deviceComponentsName: device.deviceName,
          actions: actions,
          createdById: device.createdById,
          createdByName: device.createdName,
          createdAt: device.createdAt,
          updatedById: device.updatedById,
          updatedByName: device.updatedName,
          updatedAt: device.updatedAt
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async search(params: searchFeatureServiceProps): Promise<defaultResponse> {
    try {
      const response = await this.featureRepository.search(params)
      const count = await this.featureRepository.count(params)
      return {
        success: true,
        data: {
          list: response,
          count: count.count_feature
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
      const response = await this.featureRepository.delete(params)
      if (response.delete_feature <= 0) throw new Error("Não houve alterações")

      return {
        success: true,
        message: "Recurso excluido com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
