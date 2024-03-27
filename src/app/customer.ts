import { Byte } from "@angular/compiler/src/util";

export class Customer {
    customerEmailId:string;
    customerName:string;
    password:string;
    address:Address;
    customerPhoneNum:string;
    image:string;
    constructor(){}
}

export class Address
{
    houseNo:string;
    street:string;
    city:string;
    zipCode:string;
    state:string;
    country:string;
}
