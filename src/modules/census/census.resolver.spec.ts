import { Test, TestingModule } from '@nestjs/testing'
import { CensusResolver } from './census.resolver'

describe('CensusResolver', () => {
  let resolver: CensusResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CensusResolver]
    }).compile()

    resolver = module.get<CensusResolver>(CensusResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
