import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: [
    './employee-list.component.css',
    '../../../assets/admin.lte/plugins/fontawesome-free/css/all.min.css',
    '../../../assets/admin.lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
    '../../../assets/admin.lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
    '../../../assets/admin.lte/dist/css/adminlte.min.css',
  ],
})
export class EmployeeListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
