import { getOrCreateUserProfile } from '$lib/auth'
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
  const userProfile = await getOrCreateUserProfile(locals);

  return {
    userProfile
  };
};

// export const actions = {
//   default: async ({ request, locals }) => {
//     const userProfile = await getOrCreateUserProfile(locals);

//     if (userProfile) {
//       error(401, "You need to be logged in!")
//     }

//   }
// }