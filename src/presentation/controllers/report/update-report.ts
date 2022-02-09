import { UpdateReportUseCase } from '@/domain/protocols/report'
import { env } from '@/main/config/env'
import { serverError, serverSuccess } from '@/presentation/helpers'
import { Controller, HttpResponse } from '@/presentation/protocols'

type UpdateReportRequest = {
  id: string
  finalDescription: string
  imageUrl: string
}

export class UpdateReportController implements Controller {
  constructor(private readonly updateUseCase: UpdateReportUseCase) {}

  async handle(request: UpdateReportRequest): Promise<HttpResponse<string>> {
    const finalImage = env.dirImage + request.imageUrl
    const finished = true
    const stopedAt = new Date(Date.now())
    try {
      const result = await this.updateUseCase.update(
        request.id,
        request.finalDescription,
        finalImage,
        stopedAt.toISOString(),
        finished
      )
      return serverSuccess(result)
    } catch (error) {
      serverError(error)
    }
  }
}
