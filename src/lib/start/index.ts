import { genSaltSync, hashSync } from "bcrypt"
import { FeatureRepository } from "../../cases/repositories/Feature"
import GroupRepository from "../../cases/repositories/Group"
import ParamsRepository from "../../cases/repositories/Params"
import UserRepository from "../../cases/repositories/User"

export class Start {
  private param: ParamsRepository
  private group: GroupRepository
  private user: UserRepository
  private feature: FeatureRepository

  constructor() {
    this.param = new ParamsRepository()
    this.group = new GroupRepository()
    this.user = new UserRepository()
    this.feature = new FeatureRepository()
  }

  public async initialize(): Promise<void> {
    try {
      const verification = await this.getParams()

      if (!verification.started) {
        verification.adminGroupId = (
          await this.group.initializeGroup()
        ).initialize_group

        await this.param.updateParams({
          name: "adminGroupId",
          value: `${verification.adminGroupId}`
        })

        verification.systemId = (
          await this.user.createUserForInitialize({
            groupId: verification.adminGroupId
          })
        ).create_user_for_initialize

        await this.param.updateParams({
          name: "systemId",
          value: `${verification.systemId}`
        })

        const salt = await genSaltSync(10)
        const hash = await hashSync("123", salt)

        await this.user.create({
          active: true,
          needChange: false,
          address: null,
          cpf: "33760369855",
          createdBy: verification.systemId,
          email: "douglas@epicquestti.com.br",
          groupId: verification.adminGroupId,
          name: "Douglas Pacor",
          password: hash,
          super: true,
          cellphone: "16998761113",
          rg: "422017656"
        })

        await this.feature.create({
          actions: [1, 2],
          active: true,
          canonical: "group",
          createdBy: verification.systemId,
          name: "Grupos de segurança",
          visible: true,
          deviceComponentsId: 1,
          icon: "group",
          path: "/grupo"
        })

        await this.feature.create({
          actions: [1, 2],
          active: true,
          canonical: "features",
          createdBy: verification.systemId,
          name: "Recursos",
          visible: true,
          deviceComponentsId: 1,
          icon: "featured_play_list",
          path: "/recurso"
        })

        await this.param.updateParams({ name: "started", value: "true" })
      } else return
    } catch (error: any) {
      console.log("initialize erro:", error.message)
    }
  }

  private async getParams(): Promise<{
    started: boolean
    adminGroupId: number | null
    systemId: number | null
    keepConnected: boolean
  }> {
    const res = await this.param.getApplicationParams()
    let out: Record<string, any> = {}

    for (let i = 0; i < res.length; i++)
      out[res[i].name] = JSON.parse(res[i].value)

    return out as {
      started: boolean
      adminGroupId: number | null
      systemId: number | null
      keepConnected: boolean
    }
  }
}
