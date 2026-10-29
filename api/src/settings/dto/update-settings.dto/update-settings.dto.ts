import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateSettingsDto {

    @IsOptional()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Min(0)
    revenue_per_order?: number;

    @IsOptional()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Min(0)
    cogs?: number;

    @IsOptional()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Min(0)
    @Max(100)
    fees_percentage?: number;

    @IsOptional()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Min(0)
    @Max(100)
    commissions_percentage?: number;

    @IsOptional()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Min(0)
    @Max(100)
    vat_percentage?: number;

    @IsOptional()
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @Min(0)
    shipping?: number;

}
