import { Provider } from "../types"

export default class EmailProvider extends Provider {
  async newUser(email: string, name: string, password: string): Promise<void> {
    return
  }

  async recoveryRequest(email: string, hash: string): Promise<void> {
    return
  }
}
