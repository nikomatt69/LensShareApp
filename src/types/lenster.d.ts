import type { Database } from '@/utils/supabase/database.types';

export type Channel = Database['public']['Tables']['channels']['Row'];
