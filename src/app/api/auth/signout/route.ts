import { ROUTES } from '@/constants/path';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const supabase = await createClient();

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  revalidatePath(ROUTES.HOME, 'layout');
  return NextResponse.redirect(new URL(ROUTES.LOGIN, req.url), {
    status: 302,
  });
};
