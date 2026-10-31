import {
  IsDateString,
  IsInt,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class CreateDailyResultDto {
  @IsDateString()
  date: string;

  @IsInt()
  @Min(0)
  orders: number;

  @IsNumber()
  @Min(0)
  ad_spend: number;

  @IsNumber()
  @Min(0)
  revenue_per_order: number;

  @IsNumber()
  @Min(0)
  cogs: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  fees_percentage: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  commissions_percentage: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  vat_percentage: number;

  @IsNumber()
  @Min(0)
  shipping: number;
}