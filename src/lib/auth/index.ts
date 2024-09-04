import { db } from "$lib/db";
import { profiles } from "$lib/db/schema";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const getOrCreateUserProfile = async (locals: App.Locals) => {
  const { user } = await locals.safeGetSession();

  if (!user) {
    return null;
  }

  const curProfile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id),
  });

  if (curProfile) {
    return curProfile;
  }

  await db.insert(profiles).values({
    id: user.id,
    email: user.email ?? "",
    username:  "",
  });

  const newProfile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id),
  });

  if (!newProfile) {
    error(500, "Could not create profile");
  }

  return newProfile;
};