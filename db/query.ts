import { cache } from "react";
import db from "./drizzle";

export const courses = cache(async () => {
  return db.query.courses.findMany()
})