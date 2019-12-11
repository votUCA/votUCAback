import { Test, TestingModule } from '@nestjs/testing'
import { CensusService } from './census.service'

describe('CensusService', () => {
  let service: CensusService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CensusService]
    }).compile()

    service = module.get<CensusService>(CensusService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
