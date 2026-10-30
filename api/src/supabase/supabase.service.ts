import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    readonly client = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!
    );
}
