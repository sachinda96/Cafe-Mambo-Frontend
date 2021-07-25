export interface Reservation {
  id: number;
  name: string;
  email: string;
  contactNo: string;
  location: string;
  message: string;
  type: string;
  date: Date;
}

/*
         http.get('https://www.ggogle.com ').subscribe((data)=>{
           items=data;
         }).error(err=>{
           console.log(err);
         })

*/
