import { GqlExecutionContext } from '@nestjs/graphql'
import { ExecutionContext, CanActivate, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { User } from '../users/users.type'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor (private readonly reflector: Reflector) {}

  canActivate (context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }
    const ctx = GqlExecutionContext.create(context)
    console.log(ctx)
    const { req } = ctx.getContext()
    const user: User = req.user
    const hasRole = () =>
      user.roles.some(role => !!roles.find(item => item === role))

    return user && user.roles && hasRole()
  }
}
