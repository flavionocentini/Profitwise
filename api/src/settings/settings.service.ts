import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { UpdateSettingsDto } from './dto/update-settings.dto/update-settings.dto.js';
import { SupabaseService } from '../supabase/supabase.service.js';

@Injectable()
export class SettingsService {

    constructor(private readonly supabaseService: SupabaseService) {}

    // Get settings
    async getSettings() {
        const { data, error } = await this.supabaseService.client.from('settings').select('*').limit(1).single();

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

        const { data, error } = await this.supabaseService.client.from('settings').update(body).eq('id', 1).select().single();

        if (error) {
            throw new InternalServerErrorException('Failed to update settings');
        }
        
        return data;
    }

}
