import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageService } from 'src/app/service/image.service';
import { ItemsService } from 'src/app/service/items.service';

export class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css'],
})
export class ItemFormComponent {
  constructor(
    private itemService: ItemsService,
    private imageService: ImageService
  ) {}

  // ngOnInit(): void {}

  private onSuccess() {}

  private onError() {}
  // get f() {
  //   return this.myForm.controls;
  // }

  // addItem() {
  //   console.log(this.myForm.value);
  //   this.itemService.addItem(this.myForm.value);
  // }
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    // reader.addEventListener('load', (event: any) => {
    //   this.selectedFile = new ImageSnippet(event.target.result, file);
    //   this.imageService.uploadImage(this.selectedFile.file).subscribe(
    //     (res) => {
    //       this.onSuccess();
    //       console.log('successful' + res);
    //     },
    //     (err) => {
    //       this.onError();
    //       console.log(err);
    //     }
    //   );

    //   reader.readAsDataURL(file);
    // });
  }
}

/*
 // imageSrc: string = '';
  // myForm = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   file: new FormControl('', [Validators.required]),
  //   fileSource: new FormControl('', [Validators.required]),
  // });
  //selectedFile: ImageSnippet = new ImageSnippet();



'../../admin.lte/plugins/fontawesome-free/css/all.min.css',
    '../../admin.lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
    '../../admin.lte/dist/css/adminlte.min.css',



*/
