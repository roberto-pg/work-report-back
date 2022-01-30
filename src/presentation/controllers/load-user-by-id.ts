import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadUserByIdUseCase } from '@/domain/protocols'
import { serverSuccess, serverError } from '@/presentation/helpers'

type UserIdRequest = {
  userId: string
}

export class LoadUserByIdController implements Controller {
  constructor(private readonly userIdUseCase: LoadUserByIdUseCase) {}

  async handle(request: UserIdRequest): Promise<HttpResponse<any>> {
    try {
      const user = await this.userIdUseCase.load(request.userId)
      return serverSuccess(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
