import { Routes } from '@angular/router';

export const routes: Routes = [
    // {
    //     path: 'home',
    //     component: HomeComponent
    // },
    // {
    //     path: 'about',
    //     component: AboutComponent
    // },
    // {
    //     path: 'about/:id',
    //     component: AboutComponent
    // },

    // lazy loading
    {
        path: '',
        loadComponent: () => import('./Components/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('./Components/about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'about/:id',
        loadComponent: () => import('./Components/about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'admin',
        loadComponent: () => import('./Components/admin/admin.component').then(m => m.AdminComponent)
    }
];
