import { registerEnumType } from 'type-graphql'

export enum Role {
  ADMIN = 'ADMIN',
  SECRETARY = 'SECRETARY',
  VOTER = 'VOTER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'All possible roles on app',
})
