import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { take } from 'rxjs/operators';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { Member } from 'src/app/_models/member';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnDestroy {
 @ViewChild('memberTabs',{static:true}) memberTabs:TabsetComponent; 
member:Member;
galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab:TabDirective;
  messages:Message[]=[]; 
  user:User;

  constructor(public presence:PresenceService,private route:ActivatedRoute,
   private messageService:MessageService,private accountService:AccountService,
   private router:Router) {
     this.accountService.currentUser$.pipe(take(1)).subscribe(user=>this.user=user);
     this.router.routeReuseStrategy.shouldReuseRoute=()=>false; //because of loading new messages when 
     //notification comes. We manually updated that tab 3 and angular 
     //by default uses old route if we dont turn this off
    }



  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.member=data.member;
    }) //route-resolver route
    this.route.queryParams.subscribe(params=>{
      params.tab ? this.selectTab(params.tab) :this.selectTab(0);
    })
    this.galleryOptions=[
      {
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation:NgxGalleryAnimation.Slide,
        preview:false
      }
    ]
  this.galleryImages=this.getImages();

  
  }

  getImages():NgxGalleryImage[]
  {
const imageUrls=[];
for(const photo of this.member.photos)
{
imageUrls.push({
  small:photo?.url,
  medium:photo?.url,
  big:photo?.url
})
}
return imageUrls;
  }

loadMessages()
{
  this.messageService.getMessageThread(this.member.username).subscribe(messages=>{
    this.messages=messages;
  })
}

onTabActivated(data:TabDirective)
{
  this.activeTab=data;
  if(this.activeTab.heading==='Messages' && this.messages.length===0) //access for heading called Messages in .html component && if switching between tabs and we have messages already loaded we dont reload them again  
  {
    this.messageService.createHubConnection(this.user,this.member.username);
  }
  else{
    this.messageService.stopHubConnection();
  }
}
selectTab(tabId:number)
{
  this.memberTabs.tabs[tabId].active=true;
}

ngOnDestroy(): void {
  this.messageService.stopHubConnection();
}

}