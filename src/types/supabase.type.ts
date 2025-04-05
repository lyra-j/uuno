import { SupabaseClient } from '@supabase/supabase-js';
import { Database, Tables } from './supabase';

export type User = Tables<'users'>;
export type CardViews = Tables<'card_views'>;
export type Cards = Tables<'cards'>;
export type Tamplates = Tables<'templates'>;

export type Supabase = SupabaseClient<Database>;
