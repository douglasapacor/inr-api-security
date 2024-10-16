declare namespace Express {
  export interface Request {
    meta: {
      date: Date
      method: string
      start: number
      finish?: number
    }
    user: {
      id: number
    }
  }
}
