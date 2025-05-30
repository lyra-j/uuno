import { SupabaseClient } from '@supabase/supabase-js';
import { Database, Tables } from './supabase';

export type User = Tables<'users'>;
export type CardViews = Tables<'card_views'>;
export type Cards = Tables<'cards'>;
export type Templates = Tables<'templates'>;

export type CardSelectList = Pick<Cards, 'id' | 'title'>;

export type Supabase = SupabaseClient<Database>;
