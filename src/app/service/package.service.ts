import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from 'src/environments/environment';
import { Package, packages } from '../model/packages';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  constructor(private http: HttpClient) {}

  getAllPackages() {
    return this.http.get<Package[]>(BASE_URL + '/package');
  }
}
