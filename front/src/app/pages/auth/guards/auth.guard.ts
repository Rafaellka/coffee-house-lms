import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { inject } from "@angular/core";
import { AuthRequestService } from "../data/services/auth-request.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
	const authService: AuthRequestService = inject(AuthRequestService);

	return authService.isAuthorized;
}