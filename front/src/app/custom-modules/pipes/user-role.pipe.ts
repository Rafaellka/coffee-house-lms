import { Pipe, PipeTransform } from '@angular/core';
import { UserRoleEnum } from "../../pages/auth/data/enums/user-role.enum";

@Pipe({
	name: 'userRole',
	standalone: true
})
export class UserRolePipe implements PipeTransform {
	public transform(role: UserRoleEnum): string {
		switch (role) {
			case UserRoleEnum.intern:
				return 'Интерн';

			case UserRoleEnum.barista:
				return 'Бариста';
			case UserRoleEnum.manager:
				return 'Менеджер';
			case UserRoleEnum.hr:
				return 'Менеджер по персоналу';
			case UserRoleEnum.administrator:
				return 'Управляющий';
		}
	}

}