import type { Result } from "@/types";
import { createHabitRepository, type HabitRepository } from "../repository";
import type { CreateHabitDto, Habit, UpdateHabitDto } from "../types";
import { ResultHandler } from "@/lib/result";
import { canEdit, isValidHabit } from "../utils/validator";
import { createHabit } from "../mappers";
import db from "@/db/db";

// Factory-funksjon for å opprette en habit-service
export const createHabitService = (habitRepository: HabitRepository) => {
  // Henter en habit basert på ID og bruker-ID
  const getById = async (
    id: string,
    user_id: string
  ): Promise<Result<Habit | undefined>> => {
    return habitRepository.getById(id, user_id);
  };

  // Henter alle habits
  const list = async (): Promise<Result<Habit[]>> => {
    return habitRepository.list();
  };

  // Henter alle habits for en spesifikk bruker
  const listByUser = async (userId: string): Promise<Result<Habit[]>> => {
    return habitRepository.listByUser(userId);
  };

  // Oppretter en ny habit
  const create = async (data: CreateHabitDto): Promise<Result<string>> => {
    const habit = createHabit(data);

    // Validerer habit-dataen
    if (!isValidHabit(habit)) {
      return ResultHandler.failure("Invalid habit data", "BAD_REQUEST");
    }
    return habitRepository.create(habit);
  };

  // Oppdaterer en eksisterende habit
  const update = async (data: UpdateHabitDto, userId: string) => {
    const habit = createHabit(data);

    // Validerer habit-dataen
    if (!isValidHabit(habit))
      return ResultHandler.failure("Invalid habit data", "BAD_REQUEST");

    // Sjekker om brukeren har rettigheter til å redigere
    if (!canEdit(habit, userId))
      return ResultHandler.failure("Can not edit this habit", "UNAUTHORIZED");

    return habitRepository.update(habit);
  };

  // Publiserer en habit
  const publish = async (id: string, user_id: string) => {
    const result = await habitRepository.getById(id, user_id);
    if (!result.success)
      return ResultHandler.failure(result.error.message, result.error.code);
    if (!result.data)
      return ResultHandler.failure("Habit not found", "NOT_FOUND");
    // Vet at data nå er en vane
    const habit = result.data;
    return habitRepository.update({ ...habit, publishedAt: new Date() });
  };

  // Sletter en habit
  const remove = async (id: string, user_id: string) => {
    return habitRepository.remove(id, user_id);
  };

  // Returnerer et objekt med alle service-metodene
  return { list, create, update, getById, listByUser, remove, publish };
};

// Oppretter en instans av habit-servicen med et repository
export const habitService = createHabitService(createHabitRepository(db));

// Definerer typen for habit-servicen
export type HabitService = ReturnType<typeof createHabitService>;