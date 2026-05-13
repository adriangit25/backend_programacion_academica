import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginService } from "./login.service";
import { LoginDto } from "./dto/login.dto";
import { SelectRolDto } from "./dto/select-rol.dto";

@ApiTags("Login")
@Controller("login")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post("validate")
  @ApiOperation({
    summary: "Paso 1: Validar credenciales",
    description:
      "Valida usuario y contraseña. Si tiene un solo rol, retorna el token directamente. Si tiene varios roles, retorna la lista para que el usuario seleccione uno.",
  })
  @ApiResponse({
    status: 200,
    description:
      "Credenciales válidas. Retorna token (1 rol) o lista de roles (varios roles)",
  })
  @ApiResponse({ status: 401, description: "Usuario o contraseña incorrectos" })
  validate(@Body() loginDto: LoginDto) {
    return this.loginService.validate(loginDto);
  }

  @Post("select-rol")
  @ApiOperation({
    summary: "Paso 2: Seleccionar rol",
    description:
      "Recibe el ID del usuario y el rol seleccionado, genera el token JWT con los menús correspondientes a ese rol.",
  })
  @ApiResponse({
    status: 200,
    description: "Login exitoso con el rol seleccionado",
  })
  @ApiResponse({
    status: 401,
    description: "Usuario no encontrado o rol no asignado",
  })
  selectRol(@Body() selectRolDto: SelectRolDto) {
    return this.loginService.selectRol(selectRolDto);
  }
}
