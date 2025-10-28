

# 🧩 **Documentación de NestJS**

## 📑 **Tabla de Contenidos**

1. [🚀 Introducción](#introducción)
2. [🧠 Conceptos Fundamentales](#conceptos-fundamentales)
3. [🎥 Recursos y Videos](#recursos-y-videos)


## 🚀 **Introducción**

NestJS es un **framework progresivo de Node.js** para construir aplicaciones del lado del servidor **eficientes, confiables y escalables**. Está construido con **TypeScript** y combina elementos de **OOP**, **FP** y **FRP**.

✨ **Características principales:**

* 🧱 Arquitectura modular y escalable
* 💙 Soporte completo de TypeScript
* ⚡ Integración con Express o Fastify
* 🧩 Inyección de dependencias robusta
* 📂 Sistema de módulos organizado


## 🧠 **Conceptos Fundamentales**

### 1️⃣ **Modules (Módulos)**

🧱 Los **módulos** son la unidad básica de organización en NestJS. Cada aplicación tiene al menos un **módulo raíz**, y la arquitectura se construye organizando el código en módulos relacionados.

**📌 Características:**

* Encapsulan un conjunto de capacidades relacionadas
* Definen controladores y proveedores
* Pueden importar/exportar otros módulos

**🧾 Ejemplo básico:**

```typescript
@Module({
  imports: [OtroModulo],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService]
})
export class UsuariosModule {}
```

🎥 **Recursos sobre Modules:**

* [Adjuntar video/enlace aquí]
* [Adjuntar documentación adicional]


### 2️⃣ **Providers (Proveedores)**

💡 Los **providers** son clases que pueden ser inyectadas como dependencias. Son la base de la **inyección de dependencias** de NestJS.

**🧩 Características:**

* Gestionan la lógica de negocio
* Declarados en `providers`
* Son *singleton* por defecto

**⚙️ Tipos de providers:**

* 🔧 **Services** — lógica de negocio
* 💾 **Repositories** — acceso a datos
* 🏭 **Factories** — instancias complejas
* 🧮 **Helpers** — utilidades

**🧾 Ejemplo:**

```typescript
@Injectable()
export class UsuariosService {
  private usuarios = [];

  crearUsuario(usuario: CreateUsuarioDto) {
    this.usuarios.push(usuario);
    return usuario;
  }

  obtenerTodos() {
    return this.usuarios;
  }
}
```

🎥 **Recursos sobre Providers:**

* [Adjuntar video/enlace aquí]
* [Adjuntar documentación adicional]


### 3️⃣ **Controllers (Controladores)**

🕹️ Los **controllers** manejan las peticiones HTTP y devuelven respuestas al cliente.

**⚙️ Características:**

* Definen rutas con decoradores
* Delegan lógica a servicios
* Manejan validaciones básicas

**🧾 Ejemplo:**

```typescript
@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Get()
  obtenerTodos() {
    return this.usuariosService.obtenerTodos();
  }

  @Post()
  crear(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.crearUsuario(createUsuarioDto);
  }
}
```

🎥 **Recursos sobre Controllers:**

* [Adjuntar video/enlace aquí]
* [Adjuntar documentación adicional]


### 4️⃣ **Pipes (Tuberías)**

🚰 Los **pipes** transforman o validan los datos de entrada antes de llegar al controlador.

**🎯 Casos de uso:**

1. 🔄 Transformación de datos
2. ✅ Validación

**🧾 Ejemplo:**

```typescript
@Get(':id')
obtenerPorId(@Param('id', ParseIntPipe) id: number) {
  return this.usuariosService.obtenerPorId(id);
}
```

**🧪 Pipe personalizado:**

```typescript
@Injectable()
export class MayusculasPipe implements PipeTransform {
  transform(value: string) {
    return value.toUpperCase();
  }
}
```

🎥 **Recursos sobre Pipes:**

* [Adjuntar video/enlace aquí]
* [Adjuntar documentación adicional]


### 5️⃣ **Middleware**

🧩 El **middleware** se ejecuta antes de los controladores y puede modificar la petición o realizar acciones intermedias.

**🔍 Usos comunes:**

* 🧾 Logging
* 🔐 Autenticación
* 🍪 Parseo de cookies
* 🧠 Modificación de headers

**🧾 Ejemplo:**

```typescript
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[${req.method}] ${req.url}`);
    next();
  }
}
```

🎥 **Recursos sobre Middleware:**

* [Adjuntar video/enlace aquí]
* [Adjuntar documentación adicional]


### 6️⃣ **Guards (Guardias)**

🛡️ Los **guards** deciden si una petición puede continuar o no, según reglas como autenticación o roles.

**🧾 Ejemplo:**

```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return this.validarToken(request);
  }

  private validarToken(request: any): boolean {
    return true;
  }
}
```

🎥 **Recursos sobre Guards:**

* [Adjuntar video/enlace aquí]
* [Adjuntar documentación adicional]


### 7️⃣ **Interceptors (Interceptores)**

⚙️ Los **interceptors** pueden transformar la respuesta, manejar errores, agregar logs o aplicar caché.

**🧾 Ejemplo:**

```typescript
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => ({
        data,
        timestamp: new Date().toISOString(),
        success: true
      }))
    );
  }
}
```

🎥 **Recursos sobre Interceptors:**

* [Adjuntar video/enlace aquí]
* [Adjuntar documentación adicional]


### 8️⃣ **Exception Filters (Filtros de Excepción)**

💥 Los **exception filters** capturan errores no manejados y permiten respuestas personalizadas.

**🧾 Ejemplo:**

```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
```

🎥 **Recursos sobre Exception Filters:**

* [Adjuntar video/enlace aquí]
* [Adjuntar documentación adicional]


### 9️⃣ **DTOs (Data Transfer Objects)**

📦 Los **DTOs (Data Transfer Objects)** son objetos que definen la estructura y las reglas de validación de los datos que se transfieren entre el cliente y el servidor. Son esenciales para la validación automática y la documentación de tu API.

**🎯 Ventajas de usar DTOs:**

* ✅ **Validación automática** — valida datos con decoradores de class-validator
* 📝 **Documentación clara** — define el contrato de tu API
* 🔒 **Seguridad** — previene inyección de campos no deseados
* 🔄 **Transformación** — convierte tipos automáticamente
* 🧪 **Testing** — facilita las pruebas con tipos claramente definidos
* 📚 **Swagger/OpenAPI** — genera documentación automáticamente

**🧾 Ejemplo completo de DTO:**

```typescript
import { 
  IsString, IsEmail, IsNotEmpty, MinLength, MaxLength,
  IsOptional, IsEnum, IsInt, Min, Max, Matches,
  IsBoolean, IsDate, IsArray, ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

enum RolUsuario {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

export class DireccionDto {
  @IsString()
  @IsNotEmpty()
  calle: string;

  @IsString()
  @IsNotEmpty()
  ciudad: string;

  @IsString()
  @IsNotEmpty()
  codigoPostal: string;
}

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre no puede exceder 50 caracteres' })
  nombre: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe contener mayúsculas, minúsculas y números'
  })
  password: string;

  @IsInt()
  @Min(18, { message: 'Debe ser mayor de edad' })
  @Max(120)
  @IsOptional()
  edad?: number;

  @IsEnum(RolUsuario)
  @IsOptional()
  rol?: RolUsuario;

  @IsBoolean()
  @IsOptional()
  activo?: boolean = true;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  fechaNacimiento?: Date;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  intereses?: string[];

  @ValidateNested()
  @Type(() => DireccionDto)
  @IsOptional()
  direccion?: DireccionDto;
}
```

**🔄 DTO para actualización (Update):**

```typescript
import { PartialType, OmitType, PickType } from '@nestjs/mapped-types';

// Hace todos los campos opcionales
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}

// Omite campos específicos
export class UpdateUsuarioSinPasswordDto extends OmitType(CreateUsuarioDto, ['password']) {}

// Solo incluye campos específicos
export class UpdateNombreUsuarioDto extends PickType(CreateUsuarioDto, ['nombre']) {}

// Combinación: PartialType + OmitType
export class UpdateUsuarioDto extends PartialType(
  OmitType(CreateUsuarioDto, ['email', 'password'])
) {}
```

**📝 Decoradores comunes de class-validator:**

```typescript
// Validación de strings
@IsString()              // Debe ser string
@IsNotEmpty()            // No puede estar vacío
@MinLength(5)            // Longitud mínima
@MaxLength(100)          // Longitud máxima
@Length(5, 100)          // Rango de longitud
@Matches(/regex/)        // Debe coincidir con regex
@IsAlpha()               // Solo letras
@IsAlphanumeric()        // Solo letras y números
@IsLowercase()           // Solo minúsculas
@IsUppercase()           // Solo mayúsculas

// Validación de números
@IsNumber()              // Debe ser número
@IsInt()                 // Debe ser entero
@Min(0)                  // Valor mínimo
@Max(100)                // Valor máximo
@IsPositive()            // Número positivo
@IsNegative()            // Número negativo

// Validación de email y URLs
@IsEmail()               // Email válido
@IsUrl()                 // URL válida

// Validación de booleanos
@IsBoolean()             // Debe ser booleano

// Validación de fechas
@IsDate()                // Debe ser fecha
@MinDate(new Date())     // Fecha mínima
@MaxDate(new Date())     // Fecha máxima

// Validación de arrays
@IsArray()               // Debe ser array
@ArrayMinSize(1)         // Tamaño mínimo del array
@ArrayMaxSize(10)        // Tamaño máximo del array
@ArrayNotEmpty()         // Array no vacío

// Validación de enums
@IsEnum(MiEnum)          // Debe ser valor del enum

// Validación condicional
@IsOptional()            // Campo opcional
@ValidateIf(o => o.campo === 'valor')  // Validar condicionalmente

// Validación de objetos anidados
@ValidateNested()        // Validar objeto anidado
@Type(() => ClaseDto)    // Transformar a clase

// Validación personalizada
@Validate(MiValidadorCustom)
```

**🔧 Uso de DTOs en controladores:**

```typescript
import { Controller, Post, Body, Param, Query, Get } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { FiltrosUsuarioDto } from './dto/filtros-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  @Post()
  crear(@Body() createUsuarioDto: CreateUsuarioDto) {
    // El DTO ya está validado automáticamente
    return this.usuariosService.crear(createUsuarioDto);
  }

  @Get()
  obtenerTodos(@Query() filtrosDto: FiltrosUsuarioDto) {
    return this.usuariosService.obtenerTodos(filtrosDto);
  }

  @Put(':id')
  actualizar(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto
  ) {
    return this.usuariosService.actualizar(+id, updateUsuarioDto);
  }
}
```

**🎨 Validación personalizada:**

```typescript
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

// Validador personalizado
@ValidatorConstraint({ name: 'isPasswordMatch', async: false })
export class IsPasswordMatchConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const password = (args.object as any)[relatedPropertyName];
    return password === confirmPassword;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Las contraseñas no coinciden';
  }
}

// Decorador personalizado
export function IsPasswordMatch(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsPasswordMatchConstraint,
    });
  };
}

// Uso
export class RegisterDto {
  @IsString()
  password: string;

  @IsPasswordMatch('password')
  confirmPassword: string;
}
```

**💡 Configuración del ValidationPipe:**

```typescript
// main.ts
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(new ValidationPipe({
  whitelist: true,              // Elimina propiedades no definidas en el DTO
  forbidNonWhitelisted: true,   // Lanza error si hay propiedades extra
  transform: true,               // Transforma tipos automáticamente
  transformOptions: {
    enableImplicitConversion: true,  // Conversión automática de tipos
  },
  disableErrorMessages: false,  // Mostrar mensajes de error
  validationError: {
    target: false,              // No incluir el objeto completo en errores
    value: false,               // No incluir el valor en errores
  },
}));
```

🎥 **Recursos sobre DTOs:**

* [NestJS Validation - Documentación Oficial](https://docs.nestjs.com/techniques/validation)
* [class-validator - GitHub](https://github.com/typestack/class-validator)
* [class-transformer - GitHub](https://github.com/typestack/class-transformer)


### 🔟 **Decorators (Decoradores)**

🎨 Los **decoradores** son una característica de TypeScript que permite agregar metadatos o modificar el comportamiento de clases, métodos, propiedades o parámetros. NestJS hace un uso extensivo de decoradores para su arquitectura declarativa.

**🎯 Tipos de decoradores:**

* 🏛️ **Decoradores de clase** — `@Module()`, `@Controller()`, `@Injectable()`
* 🔧 **Decoradores de método** — `@Get()`, `@Post()`, `@UseGuards()`
* 📦 **Decoradores de parámetro** — `@Body()`, `@Param()`, `@Query()`
* 🏷️ **Decoradores de propiedad** — `@Inject()`, propiedades de DTOs

**📦 Decorador de parámetro personalizado:**

```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Extraer el usuario completo
export const Usuario = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

// Extraer una propiedad específica del usuario
export const UsuarioId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);

// Uso en controlador
@Controller('perfil')
export class PerfilController {
  @Get()
  obtenerPerfil(@Usuario() usuario: any) {
    return usuario;
  }

  @Get('id')
  obtenerId(@UsuarioId('id') id: number) {
    return { id };
  }

  @Get('email')
  obtenerEmail(@UsuarioId('email') email: string) {
    return { email };
  }
}
```

**🔐 Decorador para roles:**

```typescript
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

// Decorador simple
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// Uso
@Controller('admin')
export class AdminController {
  @Get()
  @Roles('admin', 'super-admin')
  @UseGuards(RolesGuard)
  adminOnly() {
    return 'Solo administradores';
  }
}
```

**🔓 Decorador para rutas públicas:**

```typescript
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// Uso con AuthGuard
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (isPublic) {
      return true;  // Permitir acceso sin autenticación
    }

    // Verificar autenticación
    const request = context.switchToHttp().getRequest();
    return !!request.user;
  }
}

// En controlador
@Controller('auth')
export class AuthController {
  @Public()
  @Post('login')
  login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Public()
  @Post('register')
  register(@Body() userData: RegisterDto) {
    return this.authService.register(userData);
  }

  // Esta ruta SÍ requiere autenticación
  @Post('logout')
  logout(@Usuario() usuario: any) {
    return this.authService.logout(usuario.id);
  }
}
```

**⏱️ Decorador para timeout:**

```typescript
import { SetMetadata } from '@nestjs/common';

export const TIMEOUT_KEY = 'timeout';
export const Timeout = (ms: number) => SetMetadata(TIMEOUT_KEY, ms);

// Interceptor que lee el metadata
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const timeoutValue = this.reflector.get<number>(
      TIMEOUT_KEY,
      context.getHandler(),
    );

    if (!timeoutValue) {
      return next.handle();
    }

    return next.handle().pipe(
      timeout(timeoutValue),
      catchError(err => {
        if (err instanceof TimeoutError) {
          throw new RequestTimeoutException();
        }
        throw err;
      })
    );
  }
}

// Uso
@Controller('api')
export class ApiController {
  @Get('slow')
  @Timeout(5000)  // 5 segundos de timeout
  slowEndpoint() {
    return this.service.slowOperation();
  }
}
```

**📊 Decorador compuesto:**

```typescript
import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { TransformInterceptor } from '../interceptors/transform.interceptor';

// Decorador que combina múltiples decoradores
export function Auth(...roles: string[]) {
  return applyDecorators(
    Roles(...roles),
    UseGuards(AuthGuard, RolesGuard),
    UseInterceptors(TransformInterceptor),
  );
}

// Uso simplificado
@Controller('admin')
export class AdminController {
  @Get()
  @Auth('admin')  // Aplica guards, roles e interceptors
  adminOnly() {
    return 'Panel de administración';
  }
}
```

**🎨 Decorador de validación de API Key:**

```typescript
import { SetMetadata } from '@nestjs/common';

export const API_KEY_REQUIRED = 'apiKeyRequired';
export const RequireApiKey = () => SetMetadata(API_KEY_REQUIRED, true);

// Guard para verificar API Key
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requireApiKey = this.reflector.getAllAndOverride<boolean>(
      API_KEY_REQUIRED,
      [context.getHandler(), context.getClass()],
    );

    if (!requireApiKey) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    const validApiKey = this.configService.get('API_KEY');

    return apiKey === validApiKey;
  }
}

// Uso
@Controller('external')
export class ExternalApiController {
  @Get('data')
  @RequireApiKey()
  getData() {
    return this.service.getExternalData();
  }
}
```

**🔄 Decorador con pipes integrados:**

```typescript
import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

// Decorador para transformar a mayúsculas
export function ToUpperCase() {
  return Transform(({ value }) => value?.toUpperCase());
}

// Decorador para trim de strings
export function Trim() {
  return Transform(({ value }) => 
    typeof value === 'string' ? value.trim() : value
  );
}

// Decorador para valores por defecto
export function Default(defaultValue: any) {
  return Transform(({ value }) => value ?? defaultValue);
}

// Uso en DTO
export class CreateProductDto {
  @IsString()
  @Trim()
  @ToUpperCase()
  nombre: string;

  @IsString()
  @Trim()
  @Default('Sin descripción')
  descripcion: string;
}
```

**📝 Decorador de caché:**

```typescript
import { SetMetadata } from '@nestjs/common';

export const CACHE_KEY = 'cache';
export const CACHE_TTL_KEY = 'cache_ttl';

export const CacheIt = (ttl: number = 60) => 
  applyDecorators(
    SetMetadata(CACHE_KEY, true),
    SetMetadata(CACHE_TTL_KEY, ttl)
  );

// Uso
@Controller('productos')
export class ProductosController {
  @Get()
  @CacheIt(300)  // Cache por 5 minutos
  obtenerTodos() {
    return this.productosService.findAll();
  }
}
```

**🧪 Decorador de método con logging:**

```typescript
export function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    console.log(`Llamando a ${propertyKey} con args:`, args);
    const startTime = Date.now();
    
    try {
      const result = await originalMethod.apply(this, args);
      const endTime = Date.now();
      console.log(`${propertyKey} completado en ${endTime - startTime}ms`);
      return result;
    } catch (error) {
      console.error(`Error en ${propertyKey}:`, error);
      throw error;
    }
  };

  return descriptor;
}

// Uso
@Injectable()
export class UsuariosService {
  @LogMethod
  async crearUsuario(dto: CreateUsuarioDto) {
    // Automáticamente loggeará entrada y salida
    return await this.prisma.user.create({ data: dto });
  }
}
```

**🎯 Decoradores útiles de NestJS:**

```typescript
// Controladores
@Controller('path')
@Get() @Post() @Put() @Delete() @Patch()
@HttpCode(200)
@Header('Cache-Control', 'none')
@Redirect('url', 301)

// Parámetros
@Req() @Res() @Next()
@Body() @Param() @Query()
@Headers() @Ip() @HostParam()
@Session() @UploadedFile()

// Guards y Pipes
@UseGuards(AuthGuard)
@UsePipes(ValidationPipe)
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)

// Inyección de dependencias
@Injectable()
@Inject('TOKEN')
@Optional()

// Módulos
@Module({ imports, providers, controllers, exports })
@Global()
```

🎥 **Recursos sobre Decorators:**

* [NestJS Custom Decorators - Documentación Oficial](https://docs.nestjs.com/custom-decorators)
* [TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
* [Metadata Reflection API](https://docs.nestjs.com/fundamentals/execution-context)


## 🎥 **Recursos y Videos**

### 📺 Videos Tutoriales

1. **🧭 Introducción a NestJS**

   * [Adjuntar enlace de video]
   * Duración:
   * Temas:

2. **🏗️ Arquitectura y Conceptos**

   * [Adjuntar enlace de video]
   * Duración:
   * Temas:

3. **💻 Proyecto Práctico**

   * [Adjuntar enlace de video]
   * Duración:
   * Temas:


### 📚 **Documentación Adicional**

* 📘 [Documentación oficial de NestJS](https://docs.nestjs.com/)
* 🧭 [Repositorio de GitHub](https://github.com/nestjs/nest)
* 🧩 [Ejemplos de código]
* 📝 [Artículos recomendados]


### 🧱 **Proyectos de Ejemplo**

* 🔗 [Adjuntar enlaces a repositorios de ejemplo]
* 🖼️ [Adjuntar capturas de pantalla]
* 🗺️ [Adjuntar diagramas de arquitectura]


## 💡 **Notas Adicionales**

### 🔥 **Mejores Prácticas:**

**📂 Organización del código:**
* **Módulos por funcionalidad** — agrupa código relacionado en módulos feature
* **Separación de responsabilidades** — controladores para routing, servicios para lógica
* **Un archivo por clase** — facilita el mantenimiento y testing
* **Estructura consistente** — usa la misma estructura en todos los módulos

**✅ Validación y seguridad:**
* **DTOs en todas las entradas** — valida todos los datos que ingresan a la aplicación
* **ValidationPipe global** — aplica validación automática en toda la app
* **Guards para autenticación** — protege rutas que requieren autenticación
* **Guards para autorización** — verifica permisos y roles
* **Sanitización de datos** — usa `whitelist` y `forbidNonWhitelisted` en ValidationPipe

**🧪 Testing:**
* **Tests unitarios** — para servicios y lógica de negocio
* **Tests de integración** — para controladores y flujos completos
* **Tests e2e** — para probar la aplicación completa
* **Mocking de dependencias** — aísla componentes en tests

**📝 Documentación:**
* **Swagger/OpenAPI** — documenta tu API automáticamente
* **Comentarios JSDoc** — documenta clases y métodos complejos
* **README completo** — incluye setup, arquitectura y ejemplos

**⚡ Performance:**
* **Caching** — usa interceptors para cachear respuestas
* **Compresión** — habilita compresión de respuestas
* **Rate limiting** — protege contra abuso de API
* **Paginación** — implementa paginación en listas grandes

**🔒 Seguridad:**
* **Helmet** — protege contra vulnerabilidades web comunes
* **CORS** — configura correctamente políticas de origen cruzado
* **Rate limiting** — previene ataques de fuerza bruta
* **Validación estricta** — no confíes en datos del cliente

**📊 Logging y monitoreo:**
* **Logger integrado** — usa el Logger de NestJS
* **Diferentes niveles** — log, error, warn, debug, verbose
* **Context específico** — identifica el origen de los logs
* **Logging estructurado** — usa formato JSON en producción

### 🚧 **Próximos Pasos:**

**🗄️ Base de datos:**
* [ ] Configurar Prisma/TypeORM para acceso a datos
* [ ] Implementar migraciones de base de datos
* [ ] Crear repositorios/servicios de datos
* [ ] Implementar transacciones

**� Autenticación y Autorización:**
* [ ] Implementar autenticación con JWT
* [ ] Crear sistema de refresh tokens
* [ ] Implementar guards de autenticación
* [ ] Sistema de roles y permisos

**🧪 Testing:**
* [ ] Configurar tests unitarios con Jest
* [ ] Escribir tests de integración
* [ ] Implementar tests e2e
* [ ] Configurar cobertura de código

**📜 Documentación:**
* [ ] Integrar Swagger/OpenAPI
* [ ] Documentar todos los endpoints
* [ ] Crear ejemplos de uso
* [ ] Documentar DTOs y respuestas

**☁️ DevOps y Deployment:**
* [ ] Configurar variables de entorno
* [ ] Crear Dockerfile
* [ ] Configurar CI/CD
* [ ] Deploy a producción

**🔧 Funcionalidades adicionales:**
* [ ] Sistema de archivos/uploads
* [ ] Envío de emails
* [ ] WebSockets para real-time
* [ ] Queue/Jobs con Bull
* [ ] GraphQL como alternativa a REST

### 📚 **Recursos Recomendados:**

**📖 Documentación oficial:**
* [NestJS Official Docs](https://docs.nestjs.com/)
* [NestJS Fundamentals](https://docs.nestjs.com/fundamentals/custom-providers)
* [NestJS Techniques](https://docs.nestjs.com/techniques/database)

**🎓 Cursos y tutoriales:**
* [NestJS Official Courses](https://courses.nestjs.com/)
* [NestJS Crash Course - YouTube](https://www.youtube.com/results?search_query=nestjs+crash+course)
* [FreeCodeCamp NestJS](https://www.freecodecamp.org/news/search/?query=nestjs)

**💻 Ejemplos y plantillas:**
* [NestJS Examples - GitHub](https://github.com/nestjs/nest/tree/master/sample)
* [Awesome NestJS](https://github.com/nestjs/awesome-nestjs)

**🛠️ Herramientas útiles:**
* **Postman/Insomnia** — testing de APIs
* **Docker** — containerización
* **Prisma Studio** — GUI para base de datos
* **VS Code extensions** — extensiones para NestJS

### 🎯 **Comandos CLI útiles:**

```bash
# Generar recursos
nest g module usuarios
nest g controller usuarios
nest g service usuarios
nest g resource usuarios  # Genera module + controller + service + DTOs

# Generar guards, interceptors, pipes, etc.
nest g guard auth
nest g interceptor logging
nest g pipe validation
nest g filter http-exception

# Generar aplicación completa
nest new mi-proyecto
nest new mi-proyecto --package-manager pnpm

# Iniciar en modo desarrollo
npm run start:dev

# Build para producción
npm run build
npm run start:prod

# Tests
npm run test           # Tests unitarios
npm run test:watch     # Tests en modo watch
npm run test:cov       # Tests con cobertura
npm run test:e2e       # Tests end-to-end
```

### � **Flujo de petición en NestJS:**

```
1. Cliente realiza petición HTTP
         ↓
2. Middleware (logging, CORS, etc.)
         ↓
3. Guards (autenticación, autorización)
         ↓
4. Interceptors (before)
         ↓
5. Pipes (validación, transformación)
         ↓
6. Controller (routing)
         ↓
7. Service (lógica de negocio)
         ↓
8. Repository/Database (datos)
         ↓
9. Service retorna resultado
         ↓
10. Interceptors (after - transformación)
         ↓
11. Exception Filters (si hay errores)
         ↓
12. Respuesta al cliente
```

---

�🕓 *Última actualización: Octubre 24, 2025*

📝 *Esta documentación cubre los conceptos fundamentales de NestJS. Para información más detallada, consulta la [documentación oficial](https://docs.nestjs.com/).*
