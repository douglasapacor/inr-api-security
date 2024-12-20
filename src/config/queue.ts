import external from "./external"

export default {
  mail: {
    send: `${external.queue}/tunnel/send-mail`
  },
  notification: {
    send: `${external.queue}/tunnel/send-notification`
  }
}
