import { Component, OnInit, ViewChild,HostListener, ViewChildren,ComponentFactoryResolver, QueryList,Inject,ViewContainerRef, ComponentFactory, ComponentRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { AppSettings } from '../app.settings';
import { Settings } from '../app.settings.model';
import { MenuService } from '../theme/components/menu/menu.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers: [ MenuService ,HttpClient]
})

export class PagesComponent implements OnInit { 
  @ViewChild('sidenav') sidenav:any;

  //Members for controlling UI
  @ViewChildren(PerfectScrollbarDirective) pss: QueryList<PerfectScrollbarDirective>;
  public settings:Settings;
  public menus = ['vertical', 'horizontal'];
  public menuOption:string;
  public menuTypes = ['default', 'compact', 'mini'];
  public menuTypeOption:string;
  public lastScrollTop:number = 0;
  public showBackToTop:boolean = false;
  public toggleSearchBar:boolean = false;


  //constructor
  constructor(private factoryResolver: ComponentFactoryResolver,
              public appSettings:AppSettings, 
              public router:Router, 
              private menuService: MenuService,
              private http: HttpClient)
  {        
    this.settings = this.appSettings.settings;
  }
  //Init Functions
  ngOnInit() {
    if(window.innerWidth <= 768){
      this.settings.menu = 'vertical';
      this.settings.sidenavIsOpened = false;
      this.settings.sidenavIsPinned = false;
    }
    this.menuOption = this.settings.menu; 
    this.menuTypeOption = this.settings.menuType; 
  }
  ngAfterViewInit(){
    setTimeout(() => { this.settings.loadingSpinner = false }, 300);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        if(!this.settings.sidenavIsPinned){
          this.sidenav.close(); 
        }      
        if(window.innerWidth <= 768){
          this.sidenav.close(); 
        } 
      }                
    });
    if(this.settings.menu == "vertical")
      this.menuService.expandActiveSubMenu(this.menuService.getVerticalMenuItems());
  }

  //this function generate pdf with all barcodes
  public downloadFile()
  {
    let url = "http://localhost:57768/home/download";
  
    var body = {  };
    this.http.post(url,body,{
      observe: 'response',
      responseType: "blob",
      headers: new HttpHeaders()
    }).subscribe(
      data => {
        console.log(data);
        let file_name = data.headers.get('content-disposition').split(';')[1].split('=')[1].replace(/\"/g, '');
        fileSaver.saveAs(data.body, file_name);
      },
      err => {
        alert("Problem while downloading the file.");
        console.error(err);
      }
    );
    
  }
}
