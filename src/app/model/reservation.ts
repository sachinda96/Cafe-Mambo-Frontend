export class EventBookingUser {
  id: string | undefined;
  userId: string | null = '';
  contactNumber: string = '';
  location: string = '';
  message: string = '';
  date: Date = new Date();
  packageId: string | undefined = '';

  constructor() {}
}

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

  constructor() {}
}

/*
         http.get('https://www.ggogle.com ').subscribe((data)=>{
           items=data;
         }).error(err=>{
           console.log(err);
         })

*/
