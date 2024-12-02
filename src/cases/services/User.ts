import { compare, genSaltSync, hashSync } from "bcrypt"
import { generateKey } from "../../lib/helpers/randoms"
import type EmailProvider from "../providers/Email"
import type UserRepository from "../repositories/User"
import type { authenticationUserServiceProps } from "../schema/authenticationUser"
import type { commonDeleteServiceProps } from "../schema/commomDelete"
import type { getByIdServiceProps } from "../schema/commomGetById"
import type { confirmRecoveryServiceProps } from "../schema/confirmRecovery"
import type { createUserServiceProps } from "../schema/createUser"
import type { recoveryPasswordServiceProps } from "../schema/recoveryPassword"
import type { searchUserServiceProps } from "../schema/searchUser"
import type { updateUserServiceProps } from "../schema/updateUser"
import type { defaultResponse } from "../types"
import type PermissionRepository from "../repositories/Permissions"
import application from "../../config/application"
import { sign } from "jsonwebtoken"

export default class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailProvider: EmailProvider,
    private permissionRepository: PermissionRepository
  ) {}

  async create(params: createUserServiceProps): Promise<defaultResponse> {
    try {
      const emailVerifyResult = await this.userRepository.verifyIfExistEmail({
        email: params.email
      })

      if (emailVerifyResult.verify_if_exist_email > 0)
        throw new Error("Já existe um usuário cadastrado com esse email.")

      const cpfVerifyResult = await this.userRepository.verifyIfExistCpf({
        cpf: params.cpf
      })

      if (cpfVerifyResult.verify_if_exist_cpf > 0)
        throw new Error("Já existe um usuário cadastrado com esse cpf.")

      const randomPass = generateKey(8)
      const salt = await genSaltSync(10)
      const hash = await hashSync(randomPass, salt)

      const user = await this.userRepository.create({
        needChange: true,
        super: params.super,
        active: params.active,
        groupId: params.groupId,
        password: hash,
        createdBy: params.createdById,
        name: params.name,
        email: params.email,
        cpf: params.cpf,
        rg: params.rg,
        cellphone: params.cellphone,
        address: params.address
      })

      for (let i = 0; i < params.permissions.length; i++) {
        await this.permissionRepository.create({
          userId: user.create_user,
          featureId: params.permissions[i].featureId,
          actions: params.permissions[i].actions,
          createdBy: params.createdById
        })
      }

      this.emailProvider.newUser(params.email, params.name, randomPass)

      return {
        success: true,
        message: "Novo usuário criado com sucesso.",
        data: {
          id: user.create_user
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async update(params: updateUserServiceProps): Promise<defaultResponse> {
    try {
      const user = await this.userRepository.update({
        id: params.id,
        super: params.super,
        groupId: params.groupId,
        active: params.active,
        updatedBy: params.updatedById,
        name: params.name,
        email: params.email,
        cpf: params.cpf,
        rg: params.rg,
        cellphone: params.cellphone,
        address: params.address
      })

      if (user.update_user <= 0) throw new Error("Não houve alterações")

      for (let i = 0; i < params.permissions.length; i++) {
        await this.permissionRepository.create({
          userId: params.id,
          featureId: params.permissions[i].featureId,
          actions: params.permissions[i].actions,
          createdBy: params.updatedById
        })
      }

      return {
        success: true,
        message: "Usuário editado com sucesso"
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
      const res = await this.userRepository.delete(params)

      if (res.delete_user <= 0) throw new Error("Não houveram alterações.")

      return {
        success: true,
        message: "usuário excluido com sucesso."
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
      const user = await this.userRepository.getById({
        id: params.id
      })

      if (!user) throw new Error("Usuário não encontrado.")

      const permissions = await this.permissionRepository.getPermissions({
        userId: params.id
      })

      return {
        success: true,
        data: { ...user, permissions }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async search(params: searchUserServiceProps): Promise<defaultResponse> {
    try {
      const response = await this.userRepository.search(params)
      const count = await this.userRepository.count(params)

      return {
        success: true,
        data: {
          list: response,
          count: count.count_users
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async authentication(
    params: authenticationUserServiceProps
  ): Promise<defaultResponse> {
    try {
      let userId = await this.userRepository.getByEmail({
        email: params.login
      })

      if (!userId) {
        userId = await this.userRepository.getByCpf({
          cpf: params.login
        })
      }

      if (!userId) {
        userId = await this.userRepository.getByCellphone({
          cellphone: params.login
        })
      }

      if (!userId) throw new Error("Usuário não encontrado.")

      const userFinded = await this.userRepository.getUserToAuthentication(
        userId
      )

      const passwordResult = await compare(params.password, userFinded.password)

      if (!passwordResult) throw new Error("Senha incorreta.")
      if (!application.key) throw new Error("Erro ao autenticar usuário.")

      let rawToken: any = {}

      if (userFinded.needChange) {
        rawToken.id = userId
        const token = sign(JSON.stringify(rawToken), application.key)

        return {
          success: true,
          data: {
            needChange: true,
            credential: token
          }
        }
      }

      let userPermissionsResults

      if (userFinded.groupSuper && userFinded.super) {
        userPermissionsResults =
          await this.permissionRepository.getAdminPermissions()
      } else {
        userPermissionsResults = await this.permissionRepository.getPermissions(
          {
            userId: userId.id
          }
        )
      }

      let access = []

      rawToken.id = userId.id
      rawToken.super = userFinded.super
      rawToken.name = userFinded.userName
      rawToken.groupId = userFinded.groupId
      rawToken.groupName = userFinded.groupCanonicalName
      rawToken.groupSuper = userFinded.groupSuper
      rawToken.credentials = {}

      for (let i = 0; i < userPermissionsResults.length; i++) {
        access.push({
          name: userPermissionsResults[i].featurename,
          icon: userPermissionsResults[i].featureicon,
          path: userPermissionsResults[i].featurepath,
          deviceId: userPermissionsResults[i].featuredeviceid
        })

        rawToken.credentials[userPermissionsResults[i].featurecanonical] = []

        for (let y = 0; y < userPermissionsResults[i].actions.length; y++) {
          rawToken.credentials[userPermissionsResults[i].featurecanonical].push(
            userPermissionsResults[i].actions[y].canonical
          )
        }
      }

      const token = sign(JSON.stringify(rawToken), application.key)

      return {
        success: true,
        data: {
          name: userFinded.userName,
          email: userFinded.email,
          cellphone: userFinded.cellphone,
          photo: "",
          group: {
            name: userFinded.groupName,
            canonical: userFinded.groupCanonicalName
          },
          credential: token,
          access
        }
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async recoveryPassword(
    params: recoveryPasswordServiceProps
  ): Promise<defaultResponse> {
    try {
      let userId = await this.userRepository.getByEmail({
        email: params.login
      })

      if (!userId) {
        userId = await this.userRepository.getByCpf({
          cpf: params.login
        })
      }

      if (!userId) {
        userId = await this.userRepository.getByCellphone({
          cellphone: params.login
        })
      }

      if (!userId) throw new Error("Usuário não encontrado.")

      const userFinded = await this.userRepository.getUserToAuthentication(
        userId
      )

      const randomPass = generateKey(8)
      const salt = await genSaltSync(10)
      const hash = await hashSync(randomPass, salt)

      const updated = await this.userRepository.updateForRecovery({
        userId: userId.id,
        hash: hash
      })

      if (updated.update_for_recovery <= 0)
        throw new Error("Não houve alterações")

      this.emailProvider.recoveryRequest(userFinded.email, hash)

      return {
        success: true,
        message:
          "Recuperação requisitada com sucesso. Acesse o meio de contato escolhido por você e siga as instruções para finalizar a recuperação de senha e normalizar seu acesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async confirmRecovery(
    params: confirmRecoveryServiceProps
  ): Promise<defaultResponse> {
    try {
      let selectedUSer = await this.userRepository.getByEmail({
        email: params.user
      })

      if (!selectedUSer) {
        selectedUSer = await this.userRepository.getByCpf({
          cpf: params.user
        })
      }

      if (!selectedUSer) {
        selectedUSer = await this.userRepository.getByCellphone({
          cellphone: params.user
        })
      }

      if (!selectedUSer) throw new Error("Usuário não encontrado.")

      const userFinded = await this.userRepository.getUserToAuthentication(
        selectedUSer
      )

      const passwordResult = await compare(
        params.oldPassword,
        userFinded.password
      )

      if (!passwordResult) throw new Error("Senha incorreta.")

      const salt = await genSaltSync(10)
      const hash = await hashSync(params.newPassword, salt)

      const updated = await this.userRepository.updateForConfirmation({
        userId: userFinded.id,
        hash: hash
      })

      if (updated.update_for_Confirmation <= 0)
        throw new Error("Não houve alterações")

      return {
        success: true,
        message: "Senha alterada com sucesso."
      }
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
