import { Component, Input } from "@angular/core";
import { Message } from "../models/message";

@Component({
 selector: 'app-message',
 templateUrl: './message.component.html'
})
export class MessageComponent {
    @Input() oMessage:Message = new Object as Message;
}