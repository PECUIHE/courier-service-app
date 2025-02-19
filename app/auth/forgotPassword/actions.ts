'use server';

import { createClient } from '@/utils/supabase/server';

export async function resetPassword(email: string) {
  
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    throw new Error('Password recovery failed: ' + error.message + '.');
  }

  // Return success to the client
  return { success: true };

}

