import queue from "../../config/queue"
import { Provider } from "../types"

export default class EmailProvider extends Provider {
  async newUser(
    to: string,
    htmlContent: string
  ): Promise<{ success: boolean; message?: string }> {
    return await this.call<{ success: boolean; message?: string }>(
      queue.mail.send,
      {
        domain: "publicacoesinr",
        from: "naoresponda",
        to,
        subject: `Confirmação de criação de usuário para "${to}"`,
        htmlContent
      }
    )
  }

  async recoveryRequest(
    to: string,
    htmlContent: string
  ): Promise<{ success: boolean; message?: string }> {
    return await this.call<{ success: boolean; message?: string }>(
      queue.mail.send,
      {
        domain: "publicacoesinr",
        from: "naoresponda",
        to,
        subject: `Recuperação de senha de usuário para "${to}"`,
        htmlContent
      }
    )
  }
}
