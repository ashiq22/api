import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AgenceService } from 'src/app/_services/agence.service';

@Component({
  selector: 'app-add-ligne',
  templateUrl: './add-ligne.component.html',
  styleUrls: ['./add-ligne.component.scss']
})
export class AddLigneComponent implements OnInit {
   errorMessage = { show: false, msg: '' }

  nom_ligne = new FormControl('')
  showMsgAddLigne: boolean = false;
  ligneForm: FormGroup;
  constructor(private AgenceSerice: AgenceService, public formBuilder: FormBuilder,
    ) { 

  this.ligneForm = this.formBuilder.group({
    nom_ligne : this.nom_ligne,
  })
  }
  ngOnInit(): void {
  }

  addLigne(): any {

    let data = this.ligneForm.getRawValue();
    this.AgenceSerice.Addligne(data)
      .subscribe(() => {
        this.showMsgAddLigne = true;
      },  
      err => this.errorMessage = { show: true, msg: err.error },);  
  }
}
