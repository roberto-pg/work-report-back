import { ReportModel } from '@/data/models'
import { ReportRepository } from '@/data/protocols/report'
import { LoadReportsByUserUseCase } from '@/domain/protocols/report'

export class LoadReportsByUserUseCaseImpl implements LoadReportsByUserUseCase {
  constructor(private readonly repository: ReportRepository) {}

  async load(userId: string): Promise<ReportModel[]> {
    const result = await this.repository.load(userId)
    return result
  }
}
