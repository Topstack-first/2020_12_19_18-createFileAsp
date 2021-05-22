import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router'; 

import { PagesComponent } from './pages/pages.component';

export const routes: Routes = [
    { 
        path: '', 
        component: PagesComponent, children: [
        ]
    },
]; 

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
            // useHash: true
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }