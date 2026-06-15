const requestCounts = new Map<string, { count: number; resetTime: number }>()

export class RateLimiter {
  private limits: Map<string, { maxRequests: number; windowMs: number }> = new Map()

  constructor() {
    this.limits.set("default", { maxRequests: 100, windowMs: 60000 })
    this.limits.set("auth", { maxRequests: 5, windowMs: 60000 })
    this.limits.set("api", { maxRequests: 60, windowMs: 60000 })
  }

  check(key: string, type: string = "default"): { allowed: boolean; remaining: number; resetTime: number } {
    const limit = this.limits.get(type) || this.limits.get("default")!
    const now = Date.now()
    const record = requestCounts.get(key)

    if (!record || now > record.resetTime) {
      requestCounts.set(key, { count: 1, resetTime: now + limit.windowMs })
      return { allowed: true, remaining: limit.maxRequests - 1, resetTime: now + limit.windowMs }
    }

    record.count++

    if (record.count > limit.maxRequests) {
      return { allowed: false, remaining: 0, resetTime: record.resetTime }
    }

    return { allowed: true, remaining: limit.maxRequests - record.count, resetTime: record.resetTime }
  }
}
