import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public objective: string;

  @IsString()
  @IsNotEmpty()
  public budget: string;

  @IsString()
  @IsNotEmpty()
  public target_audience: string;

  @IsString()
  @IsNotEmpty()
  public ai_suggestions: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public objective: string;

  @IsString()
  @IsNotEmpty()
  public budget: string;

  @IsString()
  @IsNotEmpty()
  public target_audience: string;

  @IsString()
  @IsNotEmpty()
  public ai_suggestions: string;
}
