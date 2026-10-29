import { Controller, Get, Patch, Body } from '@nestjs/common';
import { SettingsService } from './settings.service.js';
import { UpdateSettingsDto } from './dto/update-settings.dto/update-settings.dto.js';

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    // Get settings
    @Get()
    getSettings() {
        return this.settingsService.getSettings();
    }

    // Updating settings
    @Patch()
    updateSettings(@Body() body: UpdateSettingsDto) {
        return this.settingsService.updateSettings(body);
    }

}
