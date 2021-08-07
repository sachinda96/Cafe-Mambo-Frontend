import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: [
    './employee-list.component.css',
    '../../admin.lte/plugins/fontawesome-free/css/all.min.css',
    '../../admin.lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
    '../../admin.lte/dist/css/adminlte.min.css',
  ],
})
export class EmployeeListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
