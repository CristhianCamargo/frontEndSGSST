import { Routes } from '@angular/router';
import { RoleValidateGuard } from '../guards/role-validate.guard';
import { ValidateTokenGuard } from '../guards/validate-token.guard';

export const ROUTESDASHBOARDCUSTOMER: Routes = [
    { path: '', redirectTo: 'dashboard-customer/survey', pathMatch: 'full' },
    {
        path: 'dashboard-customer',
        loadChildren: () =>
            import('../modules/private/home/home.module').then((m) => m.HomeModule),
            canActivate: [ValidateTokenGuard], canLoad: [ValidateTokenGuard]
    },
    {
        path: 'dashboard-customer/survey',
        loadChildren: () =>
            import('../modules/private/survey/survey.module').then((m) => m.SurveyModule),
            canActivate: [ValidateTokenGuard], canLoad: [ValidateTokenGuard]
    },
];
