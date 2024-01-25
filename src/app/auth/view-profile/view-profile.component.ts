import { AfterContentInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { Store } from "@ngrx/store";
import {
  Feedback,
  FeedbackPosition,
  FeedbackType,
} from "nativescript-feedback";
import { UserService } from "~/app/services/user.service";
import * as UserActions from "../../state/actions/user.action";
import * as imagePickerPlugin from "@nativescript/imagepicker";
import { Dialogs } from "@nativescript/core";

@Component({
  selector: "ns-view-profile",
  templateUrl: "./view-profile.component.html",
  styleUrls: ["./view-profile.component.scss"],
})
export class ViewProfileComponent implements OnInit {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  isFormValid: boolean = false;
  isLoading: boolean = true;
  selectedImage: string = "";
  currentUserId: string;
  currentUser: any;
  users: any;
  user: any;
  title: string = "Profile";
  private feedback: Feedback;
  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.feedback = new Feedback();
  }

  async ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    this.users = await this.userService.getAllUsers();
    this.currentUser = await this.userService.getCurrentUser();
    this.currentUserId = this.currentUser.user.uid;
    this.user = this.users?.find((res) => res?.userUid === this.currentUserId);
  }

  onUpdateProfile() {
    try {
      const updatedUser = {
        userUid: this.currentUserId,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        profileImage: this.selectedImage,
      };
      this.store.dispatch(UserActions.updateProfile({ user: updatedUser }));
      this.feedback.success({
        message: "Profile Updated successfully",
        duration: 3000,
        type: FeedbackType.Success,
        position: FeedbackPosition.Top,
      });
      this.routerExtensions.navigate(["/home"]);
    } catch (err) {
      console.log(err, "err");
    }
  }

  onUploadMedia() {
    var context = imagePickerPlugin.create({
      mode: "single",
    });

    context
      .authorize()
      .then(() => {
        return context.present();
      })
      .then((selection) => {
        selection.forEach((selectedImage) => {
          this.selectedImage = selectedImage?.path;
        });
      })
      .catch((e) => {
        // console.log(e);
      });
  }

  async menuItems() {
    const options = {
      title: "Image Options",
      cancelButtonText: "Cancel",
      actions: ["Update Image", "Remove Image"],
    };
    Dialogs.action(options).then((result) => {
      if (result === "Update Image") {
        this.onUploadMedia();
      } else if (result === "Remove Image") {
        this.selectedImage = "~/images/user2.png";
      }
    });
  }

  goBack() {
    this.routerExtensions.navigate(["/home"]);
  }

  validateForm() {
    this.isFormValid = this.isValidEmail(this.email);
  }

  isValidEmail(email: string): boolean {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }
}
