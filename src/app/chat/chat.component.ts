import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { Message } from "../models/message";
import { ChatService } from "../services/chat.service";
import { FormControl } from "@angular/forms";

@Component({
 selector: 'chat-app',
 templateUrl: './chat.component.html'
})
export class ChatComponent {
    public nombre = "Angel Giner Vidal";
    private baseUrlProve: string = "https://localhost:44377/";
    public lstMessages : Observable<Message[]> = new Observable<Message[]>;

    textControl = new FormControl('');
    nameControl = new FormControl('');
    @ViewChild('text') text: ElementRef|null = null;

    
    constructor(http: HttpClient,
        protected chatService: ChatService) {
            this.GetInfo();
    }
    /*
    constructor(http: HttpClient, @Inject('BASE_API_URL') baseUrl:string,
        protected chatService: ChatService) {
        http.get<Message[]>(this.baseUrlProve+ "api/Chat/Message").subscribe(result =>{
            this.lstMessages = result;

        }, error => console.error(error));
    }*/

    public CambiaNombre() {
        this.nombre = "Galen"
    }
    public GetInfo() 
    {
        this.lstMessages = this.chatService.GetMessage();
    }
    public SendMessage(){
        this.chatService.Add(this.nameControl.value!, this.textControl.value!);

        setTimeout(()=>{
            this.GetInfo();
        },300);

        this.textControl.setValue('');
        this.text!.nativeElement.focus();
    }
}


