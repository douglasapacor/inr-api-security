import {
  authenticationUserValidation,
  type authenticationUserControllerProps
} from "../schema/authenticationUser"
import {
  commonDeleteValidation,
  type commonDeleteControllerProps
} from "../schema/commomDelete"
import {
  getByIdValidation,
  type getByIdControllerProps
} from "../schema/commomGetById"
import {
  confirmRecoveryValidation,
  type confirmRecoveryControllerProps
} from "../schema/confirmRecovery"
import {
  createUserValidation,
  type createUserControllerProps
} from "../schema/createUser"
import {
  recoveryPasswordValidation,
  type recoveryPasswordControllerProps
} from "../schema/recoveryPassword"
import {
  searchUserValidation,
  type searchUserControllerProps
} from "../schema/searchUser"
import {
  updateUserValidation,
  type updateUserControllerProps
} from "../schema/updateUser"
import type UserService from "../services/User"
import type { defaultResponse } from "../types"

export default class UserController {
  constructor(private userService: UserService) {}

  async create(params: createUserControllerProps): Promise<defaultResponse> {
    try {
      const validation = await createUserValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.create(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async update(params: updateUserControllerProps): Promise<defaultResponse> {
    try {
      const validation = await updateUserValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.update(validation.data)
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

      return await this.userService.delete(validation.data)
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

      return await this.userService.getById(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async search(params: searchUserControllerProps): Promise<defaultResponse> {
    try {
      const validation = await searchUserValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.search(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async authentication(
    params: authenticationUserControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await authenticationUserValidation.safeParseAsync(
        params
      )

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.authentication(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async recoveryPassword(
    params: recoveryPasswordControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await recoveryPasswordValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.recoveryPassword(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  async confirmRecovery(
    params: confirmRecoveryControllerProps
  ): Promise<defaultResponse> {
    try {
      const validation = await confirmRecoveryValidation.safeParseAsync(params)

      if (!validation.success)
        throw new Error(validation.error.issues[0].message)

      return await this.userService.confirmRecovery(validation.data)
    } catch (error: any) {
      return {
        success: false,
        message: error.message
      }
    }
  }
}
