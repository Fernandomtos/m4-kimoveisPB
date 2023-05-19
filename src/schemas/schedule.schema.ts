import { z } from "zod";

const scheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

const scheduleSchemaRequest = scheduleSchema.omit({ id: true });

export { scheduleSchema, scheduleSchemaRequest };
