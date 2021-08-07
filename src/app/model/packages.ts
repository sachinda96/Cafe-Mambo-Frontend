import { ItemEntity } from './items';

export interface Package {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface PackageEntity {
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  createBy: string;
  createDate: any;
  updateBy: string;
  updateDate: any;
}

export interface PackageDetailsEntity {
  id: string;
  status: string;
  createBy: string;
  createDate: any;
  updateBy: string;
  updateDate: any;
  itemEntity: ItemEntity;
  packageEntity: PackageEntity;
}


export interface PackageDto{
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;


  
}


export const packages = [
  {
    id: 1,
    name: 'Package-1',
    price: 40000,
    description: 'for 40',
    imageUrl:
      'https://images.pexels.com/photos/4819714/pexels-photo-4819714.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    id: 2,
    name: 'Package-2',
    price: 50000,
    description: 'for 50',
    imageUrl:
      'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
  {
    id: 3,
    name: 'Package-3',
    price: 60000,
    description: 'for 60',
    imageUrl:
      'https://images.pexels.com/photos/5490894/pexels-photo-5490894.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  },
];

/*
         http.get('https://www.ggogle.com ').subscribe((data)=>{
           items=data;
         }).error(err=>{
           console.log(err);
         })

*/
