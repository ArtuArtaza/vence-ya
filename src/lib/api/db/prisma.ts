import { PrismaClient } from "@prisma/client";

export class PrismaClientSingleton {
  static instance: PrismaClient;

  private constructor() {
    console.log("constructor called!");
  }

  public static getInstance(): PrismaClient {
    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClient();
    }
    return PrismaClientSingleton.instance;
  }
}
