import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AgenceService } from 'src/app/_services/agence.service';

@Component({
  selector: 'app-add-arret',
  templateUrl: './add-arret.component.html',
  styleUrls: ['./add-arret.component.scss']
})
export class AddArretComponent implements OnInit {

  nom_arret = new FormControl('')
  longitude = new FormControl('')
  latitude = new FormControl('')
  showMsgAddLigne: boolean = false;
  errorMessage = { show: false, msg: '' }
  arretForm: FormGroup;
  constructor(private AgenceSerice: AgenceService, public formBuilder: FormBuilder,
    ) { 

  this.arretForm = this.formBuilder.group({
    nom_arret : this.nom_arret,
    longitude : this.latitude,
    latitude : this.latitude
  })
  }
  ngOnInit(): void {
  }
  addArret(): any {
    let data = this.arretForm.getRawValue();
    this.AgenceSerice.Addarret(data)
      .subscribe(() => {
        this.showMsgAddLigne = true;
        // this.formBuilder.
      }, err => this.errorMessage = { show: true, msg: err.error },);
  }

}
