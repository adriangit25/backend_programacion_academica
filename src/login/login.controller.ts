import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginService } from "./login.service";
import { LoginDto } from "./dto/login.dto";

@ApiTags("Login")
@Controller("login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiOperation({
    summary: "Iniciar sesión",
    description:
      "Autentica un usuario y retorna un token JWT con sus roles y menús",
  })
  @ApiResponse({
    status: 200,
    description: "Login exitoso, retorna token JWT y datos del usuario",
  })
  @ApiResponse({ status: 401, description: "Usuario o contraseña incorrectos" })
  async login(@Body() loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }
}
