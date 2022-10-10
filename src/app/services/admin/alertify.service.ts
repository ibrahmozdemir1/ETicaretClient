import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string, options: Partial<AlertifyOptions>){
    alertify.set('notifier','delay', options.delay);
    alertify.set('notifier','position', options.position);
    const msg = alertify[options.messageType](message);
    if(options.dismissOthers)
      msg.dismissOthers();
    
  }

  dissmiss(){
    alertify.dismissAll();
  }
}

export class AlertifyOptions{
  messageType: MessageType = MessageType.Message;
  position: MessagePosition = MessagePosition.BottomLeft;
  delay: number = 5;
  dismissOthers: boolean = false ;
}
export enum MessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Warning = "warning",
  Success = "success"
}

export enum MessagePosition{
  BottomRight = "bottom-right",
  TopRight = "top-right",
  TopCenter = "top-center",
  TopLetf = "top-left",
  BottomCenter = "bottom-center",
  BottomLeft = "bottom-left"
}