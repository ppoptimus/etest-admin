import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/upload.service';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {
  url: string | ArrayBuffer ;
  uploadlog;
  constructor(private uploadSV: UploadService) { }

  ngOnInit(): void {
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }

      const a = event.target.files[0];
      const formData: FormData = new FormData();
      formData.append('file', a, a.name);
      this.uploadSV.uploadDocument(formData).subscribe((x: any) => {
       this.uploadlog = x;
      });
    }
}

}
