'use server';

import { createClient } from '@/utils/supabase/server';

export async function registerAction(
  email: string,
  password: string,
  first_name: string,
  last_name: string,
) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { first_name, last_name, role: 'user' },
    },
  });

  if (error) {
    throw new Error('Registration failed: ' + error.message + '.');
  }

  // Return success to the client
  return { success: true };
}

