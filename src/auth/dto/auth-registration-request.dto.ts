export class AuthRegistrationRequestDto {
  readonly firstName: string;
  readonly middleName?: string;
  readonly lastName: string;
  readonly email: string;
  readonly password: string;
}
