export class Volunteer{

    name:string;
    lastname: string;
    phone:string;
    city: string;
    lat: number;
    lng: number;
    position: Position;

    firstLogin: boolean = false;

    constructor(volunteer?:Volunteer)
    {
        if(volunteer)
        {
            this.name= volunteer.name;
            this.lastname=volunteer.lastname;
            this.phone=volunteer.phone;
            this.lat = this.position.coords.latitude;
            this.lng = this.position.coords.longitude;

        }
        else{
            this.name= "";
            this.lastname="";
            this.phone="";
            this.lat = 0;
            this.lng = 0;

        }

        


    }
}
