import { $Enums } from '@prisma/client';
import {
  CreateInvitationProps,
  InvitationInfoProps,
  InvitationWebsiteProps,
} from '../../domain/types/invitation.type';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  ValidateNested,
  IsArray,
  IsUrl,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class InvitationWebsiteDTO implements InvitationWebsiteProps {
  @ApiProperty({ description: 'Website URL for the invitation' })
  @IsUrl()
  url: string;

  @ApiProperty({
    description: 'Website features',
    enum: $Enums.WebsiteFeatureEnum,
    isArray: true,
  })
  @IsEnum($Enums.WebsiteFeatureEnum, { each: true })
  @IsArray()
  @IsOptional()
  features: $Enums.WebsiteFeatureEnum[];

  @ApiPropertyOptional({
    description: 'Website tracking status',
    enum: $Enums.WebsiteTrackEnum,
  })
  @IsEnum($Enums.WebsiteTrackEnum)
  track: $Enums.WebsiteTrackEnum;

  @ApiProperty({ description: 'Website expiration date' })
  @IsOptional()
  expired_at: Date;

  @ApiProperty({ description: 'Website sent date' })
  @IsOptional()
  sent_at: Date;

  @ApiProperty({ description: 'Website opened date' })
  @IsOptional()
  opened_at: Date;
}

export class InvitationInfoDTO implements InvitationInfoProps {
  @ApiProperty({ description: 'Address of the invitee' })
  @IsString()
  address: string;

  @ApiProperty({ description: 'Origin of the invitee' })
  @IsString()
  @IsOptional()
  from: string;

  @ApiProperty({ description: 'Phone number of the invitee' })
  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @ApiProperty({ description: 'Email of the invitee' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ description: 'Category of the invitation' })
  @IsString()
  category: string;
}

export class InvitationRequestDTO implements CreateInvitationProps {
  @ApiProperty({ description: 'Name of the invitee' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Number of people invited' })
  @IsNumber()
  pax: number;

  @ApiProperty({
    description: 'Who invites the people',
    enum: $Enums.WeddingRoleEnum,
  })
  @IsEnum($Enums.WeddingRoleEnum)
  inviter: $Enums.WeddingRoleEnum;

  @ApiProperty({
    description: 'Status of the invitation',
    enum: $Enums.InvitationStatusEnum,
  })
  @IsEnum($Enums.InvitationStatusEnum)
  status: $Enums.InvitationStatusEnum;

  @ApiProperty({
    description: 'Type of invitation',
    enum: $Enums.InvitationTypeEnum,
  })
  @IsEnum($Enums.InvitationTypeEnum)
  type: $Enums.InvitationTypeEnum;

  @ApiProperty({ description: 'Priority of the invitation' })
  @IsNumber()
  @IsOptional()
  priority: number;

  @ApiProperty({ description: 'Information about the invitation' })
  @ValidateNested()
  @Type(() => InvitationInfoDTO)
  info: InvitationInfoDTO;

  @ApiProperty({ description: 'Website information for the invitation' })
  @ValidateNested()
  @Type(() => InvitationWebsiteDTO)
  website: InvitationWebsiteDTO;
}

export class DeleteInvitationRequestDTO {
  @ApiProperty({ type: [String], description: 'Array of IDs to delete' })
  @IsArray()
  ids: string[];
}
