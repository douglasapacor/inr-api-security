import { genSaltSync, hashSync } from "bcrypt"
import ApplicationParamsRepository from "../../cases/repositories/ApplicationParams"
import GroupRepository from "../../cases/repositories/Group"
import UserRepository from "../../cases/repositories/User"
const applicationParamsRepository = new ApplicationParamsRepository()
const groupRepository = new GroupRepository()
const userRepository = new UserRepository()

export default async function () {
  let params = await getParams()

  if (!("adminGroup" in params)) {
    params.adminGroup = `${(await groupRepository.createGroupForInitialize()).create_group_for_initialize}`
  }

  if (!("systemUser" in params)) {
    params.systemUser = `${(await userRepository.createUserForInitialize()).create_user_for_initialize}`
  }

  if (!("firstUser" in params)) {
    const salt = await genSaltSync(10)
    const hash = await hashSync("123", salt)

    params.firstUser = `${(await userRepository.create({
      active: true,
      address: null,
      cpf: "33760369855",
      createdBy: +params.systemUser,
      email: "douglas@epicquestti.com.br",
      groupId: +params.adminGroup,
      name: "Douglas",
      password: hash,
      super: true,
      cellphone: "16998761113",
      rg: "422017656"
    })).create_user}`
  }
}

const getParams = async (): Promise<Record<string, string>> => {
  const res = await applicationParamsRepository.getApplicationParams()
  let params: Record<string, string> = {}
  for (let i = 0; i < res.length; i++) params[res[i].key] = res[i].value
  return params
}
