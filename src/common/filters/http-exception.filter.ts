import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Une erreur est survenue';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || exception.message;
    }

    if (exception instanceof Error) {
      if (exception.message.includes('duplicate key')) {
        status = HttpStatus.CONFLICT;
        message = 'Un utilisateur avec cet email existe déjà';
      } else if (exception.message.includes('invalid password')) {
        status = HttpStatus.UNAUTHORIZED;
        message = 'Mot de passe incorrect';
      } else if (exception.message.includes('user not found')) {
        status = HttpStatus.NOT_FOUND;
        message = 'Utilisateur non trouvé';
      }
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
    });
  }
}
