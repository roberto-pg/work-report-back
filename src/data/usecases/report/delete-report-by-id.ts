// import { UseCaseError } from '@/data/errors'
import { UseCaseError } from '@/data/errors'
import { ReportRepository } from '@/data/protocols/report'
import { DeleteReportByIdUseCase } from '@/domain/protocols/report'
import { env } from '@/main/config/env'
import { unlink } from 'fs'

export class DeleteReportByIdUseCaseImpl implements DeleteReportByIdUseCase {
  constructor(private readonly repository: ReportRepository) {}

  async delete(id: string, initial: string, final: string): Promise<string> {
    const report = await this.repository.loadReportById(id)

    if (!report) {
      throw new UseCaseError('Relatório não encontrado')
    }

    try {
      const result = await this.repository.deleteReportById(id, initial, final)

      unlink(env.imageStorage + initial, (error) => {
        if (error) console.log(error)
      })

      unlink(env.imageStorage + final, (error) => {
        if (error) console.log(error)
      })

      return result
    } catch (error) {
      throw new UseCaseError('Falha para deletar o relatório')
    }
  }
}