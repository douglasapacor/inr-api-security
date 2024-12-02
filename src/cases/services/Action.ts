import type ActionRepository from "../repositories/Action"
import type { defaultResponse } from "../types"
import type { commonDeleteServiceProps } from "../schema/commomDelete"
import type { getByIdServiceProps } from "../schema/commomGetById"
import type { createActionServiceProps } from "../schema/createAction"
import type { searchActionServiceProps } from "../schema/searchAction"
import type { updateActionServiceProps } from "../schema/updateAction"

export default class ActionService {
  constructor(private actionRepository: ActionRepository) { }

  async create(params: createActionServiceProps): Promise<defaultResponse> {
    try {
      const action = await this.actionRepository.create(params)
      return {
        success: true,
        message: "Ação criado com sucesso.",
        data: {
          id: action.create_action,
          name: params.name,
          canonical: params.canonical
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async update(params: updateActionServiceProps): Promise<defaultResponse> {
    try {
      const response = await this.actionRepository.update(params)
      if (response.update_action <= 0) throw new Error("Não houve alterações")

      return {
        success: true,
        message: "Ação editada com sucesso.",
        data: {
          id: params.id,
          name: params.name,
          canonical: params.canonical
        }
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
      const device = await this.actionRepository.getById({
        id: params.id
      })

      if (!device) throw new Error("Ação não encontrada.")

      return {
        success: true,
        data: {
          id: device.id,
          name: device.name,
          canonical: device.canonical,
          createdId: device.createdid,
          createdName: device.createdname,
          createdAt: device.createdat,
          updatedId: device.updatedid,
          updatedName: device.updatedname,
          updatedAt: device.updatedat
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async search(params: searchActionServiceProps): Promise<defaultResponse> {
    try {
      const response = await this.actionRepository.search(params)
      const count = await this.actionRepository.count(params)

      return {
        success: true,
        data: {
          list: response,
          count: count.count_action
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
      const response = await this.actionRepository.delete(params)

      if (response.delete_action <= 0) throw new Error("Não houve alterações")

      return {
        success: true,
        message: "Ação excluida com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async getAll(): Promise<defaultResponse> {
    try {
      const actions = await this.actionRepository.getAll()

      return {
        success: true,
        data: actions
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
