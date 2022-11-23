import { Routes } from '@angular/router';
import { RoleValidateGuard } from '../guards/role-validate.guard';
import { ValidateTokenGuard } from '../guards/validate-token.guard';

export const ROUTESDASHBOARD: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('../modules/private/home/home.module').then((m) => m.HomeModule),
            canActivate: [ValidateTokenGuard], canLoad: [ValidateTokenGuard]
    },
    {
        path: 'dashboard/customer',
        loadChildren: () =>
            import('../modules/private/customer/customer.module').then((m) => m.CustomerModule),
            canActivate: [ValidateTokenGuard], canLoad: [ValidateTokenGuard]
    },
    {
        path: 'dashboard/question',
        loadChildren: () =>
            import('../modules/private/question/question.module').then((m) => m.QuestionModule),
            canActivate: [ValidateTokenGuard], canLoad: [ValidateTokenGuard]
    },
    {
        path: 'dashboard/survey',
        loadChildren: () =>
            import('../modules/private/survey/survey.module').then((m) => m.SurveyModule),
            canActivate: [ValidateTokenGuard], canLoad: [ValidateTokenGuard]
    },
];
