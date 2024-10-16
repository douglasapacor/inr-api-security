import ApplicationParamsRepository from "../../cases/repositories/ApplicationParams"
const applicationParamsRepository = new ApplicationParamsRepository()

export default async function () {
  const params = await getParams()

  if (!("systemUser" in params)) {
  }

  if (!("firstUser" in params)) {
  }
}

const getParams = async (): Promise<Record<string, string>> => {
  const res = await applicationParamsRepository.getApplicationParams()
  let params: Record<string, string> = {}
  for (let i = 0; i < res.length; i++) params[res[i].key] = res[i].value
  return params
}
