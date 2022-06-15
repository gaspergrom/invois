import {TransactionType} from '../transaction.dto';
import {IsDate, IsEnum, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateTransactionDto {
    @IsEnum(TransactionType)
    type: TransactionType;

    @IsString()
    projectId: string;

    @IsNumber()
    amount: number;

    @IsString()
    currency: string;

    @IsDate()
    date: Date;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
