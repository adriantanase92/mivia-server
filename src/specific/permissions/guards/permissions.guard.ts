import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";
import {AuthService} from "src/auth/auth.service";
import {UsersService} from "src/specific/users/users.service";
import {User} from "src/specific/users/schemas/user.schema";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private relfector: Reflector,
        private authService: AuthService,
        private usersService: UsersService
    ) {}

    async canActivate(context: ExecutionContext) {
        const access = this.relfector.get<string>(
            "access",
            context.getHandler()
        );
        if (!access) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const id = await this.authService.userId(request);

        const user: User = await this.usersService.findById(id, true);

        if (request.method === "GET") {
            return user.role.permissions.some(
                (p) =>
                    p.name === `view_${access}` || p.name === `edit_${access}`
            );
        }

        return user.role.permissions.some((p) => p.name === `edit_${access}`);
    }
}
