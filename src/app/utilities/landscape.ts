import { Routes } from '@angular/router';

export const ROUTESLANDSCAPES: Routes = [
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () =>
            import('../modules/public/auth/auth.module').then((m) => m.AuthModule),
    },
];