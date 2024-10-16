import { postgresStringfy, Repository } from "../types"
export enum userProcedures {
  create = "create_user",
  update = "update_user",
  getById = "get_user_by_id",
  delete = "delete_user",
  search = "search_users",
  count = "count_users",
  verifyIfExistEmail = "verify_if_exist_email",
  verifyIfExistCpf = "verify_if_exist_cpf",
  getByEmail = "get_user_id_byemail",
  getByCpf = "get_user_id_bycpf",
  getByCellphone = "get_user_id_bycellphone",
  getUserToAuthentication = "get_user_to_authentication",
  updateForRecovery = "update_for_recovery",
  updateForConfirmation = "update_for_Confirmation"
}

class Nullify {
  private content: string | null

  constructor(dataRaw: any | null) {
    if (dataRaw) {
      if ("id" in dataRaw) {
        if (!dataRaw.id) dataRaw.id = null
      } else dataRaw.id = null

      this.content = `'${JSON.stringify(dataRaw)}'`
    } else this.content = null
  }

  get out(): string | null {
    return this.content
  }
}

export default class UserRepository extends Repository {
  async create(params: {
    super: boolean
    groupId: number
    password: string
    active: boolean
    createdBy: number
    name: string
    email: string
    rg: string
    cpf: string
    cellphone: string
    address: {
      cep?: string
      street?: string
      streetNumber?: string
      neighborhood?: string
      cityIbge?: number
      observation?: string
    } | null
  }): Promise<{ create_user: number }> {
    try {
      return await this.call<{ create_user: number }>(
        userProcedures.create,
        params.super,
        params.groupId,
        postgresStringfy(params.password),
        params.active,
        params.createdBy,
        postgresStringfy(params.name),
        postgresStringfy(params.email),
        postgresStringfy(params.rg),
        postgresStringfy(params.cpf),
        postgresStringfy(params.cellphone),
        params.address ? `'${JSON.stringify(params.address)}'` : "NULL"
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async update(params: {
    id: number
    super: boolean
    groupId: number
    active: boolean
    updatedBy: number
    name: string
    email: string
    cellphone: string
    cpf: string
    rg: string
    address: {
      id?: number
      cep?: string
      street?: string
      streetNumber?: string
      neighborhood?: string
      cityIbge?: number
      observation?: string
    } | null
  }): Promise<{ update_user: number }> {
    try {
      return await this.call<{ update_user: number }>(
        userProcedures.update,
        params.id,
        params.super,
        params.groupId,
        params.active,
        params.updatedBy,
        postgresStringfy(params.name),
        postgresStringfy(params.email),
        postgresStringfy(params.cellphone),
        postgresStringfy(params.cpf),
        postgresStringfy(params.rg),
        new Nullify(params.address).out
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getById(params: { id: number }): Promise<{
    id: number
    super: boolean
    active: boolean
    groupId: number
    groupName: string
    createdById: number
    createdName: string
    createdAt: Date
    updatedById: number
    updatedName: string
    updatedAt: Date
    name: string
    email: string
    cpf: string
    rg: string
    cellphone: string
    addressId: number
    cep: string
    street: string
    streetNumber: string
    neighborhood: string
    cityIbge: number
    cityName: string
    estateIbge: number
    estateName: string
    acronym: string
  }> {
    try {
      return await this.call<{
        id: number
        super: boolean
        active: boolean
        groupId: number
        groupName: string
        createdById: number
        createdName: string
        createdAt: Date
        updatedById: number
        updatedName: string
        updatedAt: Date
        name: string
        email: string
        cpf: string
        rg: string
        cellphone: string
        addressId: number
        cep: string
        street: string
        streetNumber: string
        neighborhood: string
        cityIbge: number
        cityName: string
        estateIbge: number
        estateName: string
        acronym: string
      }>(userProcedures.getById, params.id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async delete(params: {
    id: number
    deletedBy: number
  }): Promise<{ delete_user: number }> {
    try {
      return await this.call<any>(
        userProcedures.delete,
        params.id,
        params.deletedBy
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async search(params: {
    name: string
    email: string
    cpf: string
    rg: string
    cellphone: string
    groupId: number | null
    active: boolean
    super: boolean
    limit: number
    offset: number
  }): Promise<
    {
      id: number
      super: boolean
      active: boolean
      groupId: number
      groupName: string
      name: string
      email: string
      cpf: string
      rg: string
      cellphone: string
    }[]
  > {
    try {
      return await this.list<
        {
          id: number
          super: boolean
          active: boolean
          groupId: number
          groupName: string
          name: string
          email: string
          cpf: string
          rg: string
          cellphone: string
        }[]
      >(
        userProcedures.search,
        postgresStringfy(params.name),
        postgresStringfy(params.email),
        postgresStringfy(params.cpf),
        postgresStringfy(params.rg),
        postgresStringfy(params.cellphone),
        params.groupId || "NULL",
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
    email: string
    cpf: string
    rg: string
    cellphone: string
    groupId: number | null
    active: boolean
    super: boolean
    limit: number
    offset: number
  }): Promise<{ count_users: number }> {
    try {
      return await this.call<{ count_users: number }>(
        userProcedures.count,
        postgresStringfy(params.name),
        postgresStringfy(params.email),
        postgresStringfy(params.cpf),
        postgresStringfy(params.rg),
        postgresStringfy(params.cellphone),
        params.groupId || "NULL",
        params.active,
        params.super
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async verifyIfExistEmail(params: {
    email: string
  }): Promise<{ verify_if_exist_email: number }> {
    try {
      return await this.call<{ verify_if_exist_email: number }>(
        userProcedures.verifyIfExistEmail,
        postgresStringfy(params.email)
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async verifyIfExistCpf(params: {
    cpf: string
  }): Promise<{ verify_if_exist_cpf: number }> {
    try {
      return await this.call<{ verify_if_exist_cpf: number }>(
        userProcedures.verifyIfExistCpf,
        postgresStringfy(params.cpf)
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getByEmail(params: { email: string }): Promise<{ id: number }> {
    try {
      return await this.call<{ id: number }>(
        userProcedures.getByEmail,
        postgresStringfy(params.email)
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getByCpf(params: { cpf: string }): Promise<{ id: number }> {
    try {
      return await this.call<{ id: number }>(
        userProcedures.getByCpf,
        postgresStringfy(params.cpf)
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getByCellphone(params: { cellphone: string }): Promise<{ id: number }> {
    try {
      return await this.call<{ id: number }>(
        userProcedures.getByCellphone,
        postgresStringfy(params.cellphone)
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getUserToAuthentication(params: { id: number }): Promise<{
    id: number
    active: boolean
    needChange: boolean
    password: string
    super: boolean
    groupId: number
    groupName: string
    groupCanonicalName: string
    groupSuper: boolean
    name: string
    email: string
    cpf: string
    rg: string
    cellphone: string
    permissions: {
      featureId: number
      name: string
      canonical: string
      path: string
      icon: string
      visible: boolean
      active: boolean
      deviceComponentsId: number
      deviceName: string
      deviceId: number
      actions: {
        id: number
        name: string
        canonical: string
      }[]
    }[]
  }> {
    try {
      return await this.call<{
        id: number
        active: boolean
        needChange: boolean
        password: string
        super: boolean
        groupId: number
        groupName: string
        groupCanonicalName: string
        groupSuper: boolean
        name: string
        email: string
        cpf: string
        rg: string
        cellphone: string
        permissions: {
          featureId: number
          name: string
          canonical: string
          path: string
          icon: string
          visible: boolean
          active: boolean
          deviceComponentsId: number
          deviceName: string
          deviceId: number
          actions: {
            id: number
            name: string
            canonical: string
          }[]
        }[]
      }>(userProcedures.getUserToAuthentication, params.id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateForRecovery(params: {
    userId: number
    hash: string
  }): Promise<{ update_for_recovery: number }> {
    try {
      return await this.call<{ update_for_recovery: number }>(
        userProcedures.updateForRecovery,
        params.userId,
        params.hash
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async updateForConfirmation(params: {
    userId: number
    hash: string
  }): Promise<{ update_for_Confirmation: number }> {
    try {
      return await this.call<{ update_for_Confirmation: number }>(
        userProcedures.updateForConfirmation,
        params.userId,
        params.hash
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
