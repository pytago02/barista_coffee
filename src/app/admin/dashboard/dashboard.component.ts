import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../sevices/upload-file.service';
import { response } from 'express';
import { error, log } from 'console';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
  uploadForm: FormGroup | undefined;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      image: [null]
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (this.uploadForm) {
      this.uploadForm.patchValue({
        image: file
      });
    }
  }

  // Hàm upload hình ảnh
  uploadImage() {
    const formData = new FormData();
    if (this.uploadForm) {
      formData.append('image', this.uploadForm.get('image')?.value);
    }

    this.http.post('http://localhost/upload_image.php', formData)
      .subscribe((response: any) => {
        console.log('Image uploaded successfully', response);
      }, (error: any) => {
        console.log('Error uploading image', error);
      });
  }

}
