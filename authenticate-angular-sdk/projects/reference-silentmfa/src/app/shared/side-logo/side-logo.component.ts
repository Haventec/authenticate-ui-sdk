import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-logo',
  templateUrl: './side-logo.component.html',
  styleUrls: ['./side-logo.component.scss'],
})
export class SideLogoComponent implements OnInit {
  backgroundImage: any;
  logo: any;

  constructor() { }

  ngOnInit(): void {
    this.backgroundImage = 'assets/img/Background_Image_Web.png';
    this.logo = 'assets/img/logo.png';
  }

  ngAfterviewinit() { }

}
