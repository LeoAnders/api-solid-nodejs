import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './erros/resource-not-found-error';

interface GetUserProfileCaseRequest {
  userId: string;
}

type GetUserProfileCaseResponse = {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private UsersRepository: UsersRepository) { }

  async execute({
    userId,
  }: GetUserProfileCaseRequest): Promise<GetUserProfileCaseResponse> {
    const user = await this.UsersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
