import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

/*
    Password rule :
        - at least 8 characters, max 30 characters
        - at least 1 numeric character
        - at least 1 lowercase letter
        - at least 1 uppercase letter
        - at least 1 special character
*/
const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,30}$/;

export class CreateUserDto {
  @IsEmail()
  @ApiProperty()
  public email: string;

  @Matches(PASSWORD_REGEX)
  @ApiProperty()
  public password: string;

  @IsNotEmpty()
  @ApiProperty()
  public lastname: string;

  @IsNotEmpty()
  @ApiProperty()
  public firstname: string;
}
