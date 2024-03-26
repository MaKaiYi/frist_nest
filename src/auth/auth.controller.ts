// src/auth/auth.controller.ts
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { SignInDto } from './dto/sign-in.dto'
import { Public } from 'src/common/decorators/public.decorator'
import { AuthService } from './auth.service'
import { SignUpDto } from './dto/sign-up.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Public()
	@Post('sign-up')
	signUp (@Body() signUpDto: SignUpDto) {
		return this.authService.signUp(signUpDto)
	}

	@Public()
	@Post('sign-in')
	signIn (@Body() signInDto: SignInDto) {
		return this.authService.signIn(signInDto)
	}
}
