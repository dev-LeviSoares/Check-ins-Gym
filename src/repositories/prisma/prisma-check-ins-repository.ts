import type { CheckIn } from "../../generated/prisma/client.js";
import type { CheckInUncheckedCreateInput } from "../../generated/prisma/models.js";
import { prisma } from "../../lib/prisma.js";
import type { CheckInsRepository } from "../check-ins-repositories.js";

export class PrismaCheckInsRepository implements CheckInsRepository {

  async create(data: CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data: data
    })

    return checkIn
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    })

    return checkIn
  }
  
  async countByUserId(userId: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })

    return count
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns
  }

}