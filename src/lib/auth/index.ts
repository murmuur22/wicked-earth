import { db } from "$lib/db";
import { profiles } from "$lib/db/schema";
import log from "$lib/utils/log";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const getOrCreateUserProfile = async (locals: App.Locals) => {

  // get user from supabase
  const { user } = await locals.safeGetSession();

  // return null if no user
  if (!user) {
    return null;
  }

  // check if profile exists
  const currentProfile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id)
  });

  // return profile if exists
  if (currentProfile) {
    return currentProfile;
  }

  log.plain(" HELLO FROM getOrCreateUserProfile: " + user.id + " " + user.email);

  // create profile
  await db.insert(profiles).values({
    id: user.id,
    email: user.email,
    username: ""
  });

  // get newly created profile
  const newProfile = await db.query.profiles.findFirst({
    where: eq(profiles.id, user.id)
  });

  // return error if profile not created
  if (!newProfile) {
    error(500, "Failed to create profile");
  }

  // return newly created profile
  return newProfile;
}