export class AddressInfo {
    addressline1: string;
    addressline2: string;
    addressline3: string;
    // fullName: string;
    country: string;
    state: string;
    town: string;
    pincode: string;

    constructor(addressline1: string, addressline2: string, addressline3: string,fullName:string, country: string,state: string,town: string,pincode: string) {
        this.addressline1= addressline1;
        this.addressline2= addressline2;
        this.addressline3=addressline3;
        // this.fullName=fullName;
        this.country=country;
        this.state=state;
        this.town=town;
        this.pincode=pincode;
    }
}
