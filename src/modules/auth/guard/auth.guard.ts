import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '@/modules/token/token.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeaders(request);

    if (!token) {
      throw new UnauthorizedException('Please provide token');
    }

    try {
      request['user'] = await this.tokenService.validateAccessToken(token);
    } catch (error) {
      throw new ForbiddenException(
        error.message || 'Session expired! Please sign in',
      );
    }

    return true;
  }

  private extractTokenFromHeaders(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
