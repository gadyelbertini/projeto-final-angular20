import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiPessoas } from '../service/api-pessoas';

@Component({
  selector: 'app-crud',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './crud.html',
  styleUrl: './crud.css',
})
export class Crud {

  // Visibilidade dos botões
  btnCadastrar:boolean = true;

  constructor(private servico:ApiPessoas){}
}
