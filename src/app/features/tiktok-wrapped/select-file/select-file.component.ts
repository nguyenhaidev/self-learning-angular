import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FileService} from '../../../core/services/file.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-select-file',
  imports: [
    NgIf
  ],
  templateUrl: './select-file.component.html',
  styleUrl: './select-file.component.scss'
})
export class SelectFileComponent {
  @Output() onSelectedFileChange = new EventEmitter<File | null>();
  @Input() isLoading = false

  selectedFile: File| null = null

  onSelectFile(event: any){
    if (!event?.files?.[0]) {
      this.selectedFile = null
      return
    }

    this.selectedFile = event.files[0];
    this.onSelectedFileChange.emit(this.selectedFile);
  }
}
