import type GroupRepository from "../repositories/Group"
import type { defaultResponse } from "../types"
import type { commonDeleteServiceProps } from "../schema/commomDelete"
import type { getByIdServiceProps } from "../schema/commomGetById"
import type { createGroupServiceProps } from "../schema/createGroup"
import type { searchGroupServiceProps } from "../schema/searchGroup"
import type { updateGroupServiceProps } from "../schema/updateGroup"
import type { FeatureRepository } from "../repositories/Feature"

export default class GroupService {
  constructor(
    private groupRepository: GroupRepository,
    private featureRepository: FeatureRepository
  ) {}

  async create(params: createGroupServiceProps): Promise<defaultResponse> {
    try {
      const group = await this.groupRepository.create(params)
      return {
        success: true,
        message: "Grupo criado com sucesso.",
        data: { id: group.create_group }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async update(params: updateGroupServiceProps): Promise<defaultResponse> {
    try {
      const response = await this.groupRepository.update(params)
      if (response.update_group <= 0) throw new Error("Não houve alterações")

      return {
        success: true,
        message: "Grupo editado com sucesso."
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
      const group = await this.groupRepository.getById({
        id: params.id
      })

      const features = await this.featureRepository.getGroupFeatures({
        groupId: params.id
      })

      if (!group) throw new Error("Grupo não encontrado.")

      return {
        success: true,
        data: {
          id: group.id,
          name: group.name,
          canonical: group.canonical,
          color: group.color,
          active: group.active,
          super: group.super,
          features: features,
          createdById: group.createdbyid,
          createdByName: group.createdname,
          createdAt: group.createdat,
          updatedById: group.updatedbyid,
          updatedByName: group.updatedname,
          updatedAt: group.updatedat
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async search(params: searchGroupServiceProps): Promise<defaultResponse> {
    try {
      const response = await this.groupRepository.search(params)
      const count = await this.groupRepository.count(params)
      return {
        success: true,
        data: {
          list: response,
          count: count.count_group
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
      const response = await this.groupRepository.delete(params)
      if (response.delete_group <= 0) throw new Error("Não houve alterações")

      return {
        success: true,
        message: "Grupo excluido com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
