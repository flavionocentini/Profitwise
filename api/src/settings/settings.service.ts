import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { UpdateSettingsDto } from './dto/update-settings.dto/update-settings.dto.js';

@Injectable()
export class SettingsService {

    private readonly supabase = createClient(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!
    );

    // Get settings
    async getSettings() {
        const { data, error } = await this.supabase.from('settings').select('*').limit(1).single();

        if (error) {
            throw new InternalServerErrorException('Failed to fetch settings');
        }

        return data;
    }

    // Update settings
    async updateSettings(body: UpdateSettingsDto) {

        if (Object.keys(body).length === 0) {
            throw new BadRequestException('Request body cannot be empty');
        }

        const { data, error } = await this.supabase.from('settings').update(body).eq('id', 1).select().single();

        if (error) {
            throw new InternalServerErrorException('Failed to update settings');
        }
        
        return data;
    }

}
