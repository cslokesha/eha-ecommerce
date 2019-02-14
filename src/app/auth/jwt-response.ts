import { Response } from '@angular/http';
export class JwtResponse {
    accessToken: string;
    type: string;
    username: string;
    authorities: string[];
    Response:string[];
}
