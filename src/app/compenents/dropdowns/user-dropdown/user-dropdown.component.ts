import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { AdminService } from "src/app/admin.service";

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
})
export class UserDropdownComponent implements AfterViewInit {


profileImage: string | ArrayBuffer | null = null;
constructor(
  private adminService: AdminService,
) { }
ngOnInit(){

const adminId = 1; // Remplacez par l'ID de l'admin concerné
this.adminService.getProfileImage(adminId).subscribe(
  (response) => {
    const reader = new FileReader();
    reader.onload = () => {
      this.profileImage = reader.result;
    };
    reader.readAsDataURL(response);
  },
  (error) => {
    console.error('Erreur lors de la récupération de l\'image de profil', error);
  })
}





  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false })
  btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef!: ElementRef;

  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }

  toggleDropdown(event: MouseEvent) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
}
