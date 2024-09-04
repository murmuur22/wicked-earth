import { db } from "$lib/db";
import { profiles } from "$lib/db/schema";
import log from "$lib/utils/log";
import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const getOrCreateUserProfile = async (locals: App.Locals) => {
  try {
    // get user from supabase
    const { user } = await locals.safeGetSession();

    // return null if no user
    if (!user) {
      log.error("No user found in session");
      return null;
    }

    log.plain(" Hello from getOrCreateUserProfile: " + user.id + " " + user.email);

    // check if profile exists
    const currentProfile = await db.query.profiles.findFirst({
      where: eq(profiles.id, user.id)
    });

    // return profile if exists
    if (currentProfile) {
      log.plain("Profile exists for user: " + user.id);
      return currentProfile;
    }

    // create profile
    const newProfile = await db.insert(profiles).values({
      id: user.id,
      email: user.email,
      username: ""
    }).returning("*");

    log.plain("New profile created for user: " + user.id);
    return newProfile;
  } catch (err: any) {
    log.error("Error in getOrCreateUserProfile: " + err.message);
    throw error(500, "Database error saving new user");
  }
  // get newly created profile
  // const newProfile = await db.query.profiles.findFirst({
  //   where: eq(profiles.id, user.id)
  // });

  // // return error if profile not created
  // if (!newProfile) {
  //   error(500, "Failed to create profile");
  // }

  // // return newly created profile
  // return newProfile;
}