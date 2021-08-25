export class EventBooking {
  id: string | undefined;
  name: string = '';
  email: string = '';
  contactNumber: string = '';
  location: string = '';
  message: string = '';
  bookDate: Date = new Date();
  packageId: string | undefined = '';
  userId: string | null = '';
  packageName: string | undefined = '';

  constructor() {}
}

/*
         http.get('https://www.ggogle.com ').subscribe((data)=>{
           items=data;
         }).error(err=>{
           console.log(err);
         })

*/
