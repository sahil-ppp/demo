import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {SocketMessage} from '../models/socketmessage'
import { HelperService } from './helper-service/helper.service';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  messages = this.socket.fromEvent<SocketMessage>('users');
  constructor(private socket: Socket, private helper_Service:HelperService ) { }
  newUser() {
    this.socket.emit('adduser',this.helper_Service.getuserId() );
  }
}
