import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageService } from './services/image.service';
import { Observable } from 'rxjs';
import { BlogImage } from './models/BlogImage.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css'],
})
export class ImageSelectorComponent implements OnInit {
  private file?: File;
  fileName: string = '';
  title: string = '';
  blogImages$?: Observable<BlogImage[]>;

  @ViewChild('form', { static: false }) imageUploadForm?: NgForm;
  constructor(private _imageService: ImageService) {}

  ngOnInit() {
    this.getBlogImages();
  }

  onFileUploadChange(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  uploadImage() {
    if (this.file && this.fileName != '' && this.title != '') {
      this._imageService
        .uploadImage(this.file, this.fileName, this.title)
        .subscribe({
          next: (response) => {
            this.getBlogImages();
            this.imageUploadForm?.resetForm();
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  selectImage(image: BlogImage) {
    this._imageService.selectImage(image);
  }

  private getBlogImages() {
    this.blogImages$ = this._imageService.getImages();
  }
}
