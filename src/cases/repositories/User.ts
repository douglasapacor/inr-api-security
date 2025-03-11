import { postgresStringfy, Repository } from "../types"

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
    needChange: boolean
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
        "create_user",
        params.super,
        params.groupId,
        postgresStringfy(params.password),
        params.active,
        params.needChange,
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
        "update_user",
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
      }>("get_user_by_id", params.id)
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async delete(params: {
    id: number
    deletedBy: number
  }): Promise<{ delete_user: number }> {
    try {
      return await this.call<any>("delete_user", params.id, params.deletedBy)
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
        "search_users",
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
        "count_users",
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
        "verify_if_exist_email",
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
        "verify_if_exist_cpf",
        postgresStringfy(params.cpf)
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getByEmail(params: { email: string }): Promise<{ id: number }> {
    try {
      return await this.call<{ id: number }>(
        "get_user_id_byemail",
        postgresStringfy(params.email)
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getByCpf(params: { cpf: string }): Promise<{ id: number }> {
    try {
      return await this.call<{ id: number }>(
        "get_user_id_bycpf",
        postgresStringfy(params.cpf)
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async getByCellphone(params: { cellphone: string }): Promise<{ id: number }> {
    try {
      return await this.call<{ id: number }>(
        "get_user_id_bycellphone",
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
    userName: string
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
        userName: string
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
      }>("get_user_to_authentication", params.id)
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
        "update_for_recovery",
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
        "update_for_Confirmation",
        params.userId,
        params.hash
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  async createUserForInitialize(params: { groupId: number }): Promise<{
    create_user_for_initialize: number
  }> {
    try {
      return await this.call<{ create_user_for_initialize: number }>(
        "create_user_for_initialize",
        params.groupId
      )
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
