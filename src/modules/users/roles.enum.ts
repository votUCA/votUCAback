import { registerEnumType } from 'type-graphql'

export const Roles = {
  ADMIN: 'ADMIN',
  SECRETARY: 'SECRETARY'
}

export type RoleType = keyof typeof Roles

registerEnumType(Roles, {
  name: 'Role',
  description: 'All possible roles on app'
})
