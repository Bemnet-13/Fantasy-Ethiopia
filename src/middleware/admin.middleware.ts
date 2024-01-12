import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

const adminEmails: string[] = ['admin1@fant.com', 'admin2@fant.com', 'admin3@fant.com'];

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false; 
    }

    const token = authHeader.split(' ')[1];

    
    const decodedToken = await this.authService.validateToken(token);
    
    if (!decodedToken) {
      return false; 
    }

    
    const userId = decodedToken.id; 
    
    const user = await this.authService.findById(userId);
    // console.log(user);
    // console.log(user.email);
    return adminEmails.includes(user.email);
  }
}
