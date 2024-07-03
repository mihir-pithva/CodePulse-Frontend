import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../models/BlogImage.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileExtension: '',
    fileName: '',
    title: '',
    url: '',
  });

  constructor(private _http: HttpClient) {}

  uploadImage(
    file: File,
    fileName: string,
    title: string
  ): Observable<BlogImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);
    return this._http.post<BlogImage>(
      `${environment.apiBaseUrl}/api/BlogImages`,
      formData
    );
  }

  getImages(): Observable<BlogImage[]> {
    return this._http.get<BlogImage[]>(
      `${environment.apiBaseUrl}/api/BlogImages`
    );
  }

  selectImage(image: BlogImage) {
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
}
