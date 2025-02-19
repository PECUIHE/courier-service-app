'use server';

import { createClient } from '@/utils/supabase/server';

export async function updateUser(new_password: string) {
  
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ 
    password: new_password, 
  });

  if (error) {
    throw new Error('Password change failed: ' + error.message + '.');
  }

  // Fetch the updated user
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError) throw new Error('Error fetching user data: ' + userError.message + '.');

  return {
    uid: user.user.id,
    email: user.user.email || '',
    first_name: user.user?.user_metadata?.first_name || '',
    last_name: user.user?.user_metadata?.last_name || '',
    phone: user.user?.user_metadata?.phone || '',
  };

}

