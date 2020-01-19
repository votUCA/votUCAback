import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) {
      return true
    }
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()

    const { user } = req
    const hasRole = (): boolean =>
      user.rolesName.some(role => !!roles.find(item => item === role))

    return user && user.roles && hasRole()
  }
}
