import { registerEnumType } from 'type-graphql'

export enum Role {
  ADMIN = 'ADMIN',
  SECRETARY = 'SECRETARY'
}

registerEnumType(Role, {
  name: 'Role',
  description: 'All possible roles on app'
})
