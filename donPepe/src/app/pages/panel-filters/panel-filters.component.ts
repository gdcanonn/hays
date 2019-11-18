import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ShoppingService } from 'src/app/services/shopping.service';

@Component({
  selector: 'app-panel-filters',
  templateUrl: './panel-filters.component.html',
  styleUrls: ['./panel-filters.component.css']
})
export class PanelFiltersComponent implements OnInit {

  // Atributos para comportamiento  
  disponibilidadOptions: SelectItem[];
  dispSelected: boolean;

  cantidadOptions: SelectItem[];
  cantidadSelected: string;
  
  preciosOptions: SelectItem[];
  preciosSelected: string;

  /**
   * Constructor del componente para inicializar recursos necesarios
   * @param shopping Recurso de servicio de la tienda
   */
  constructor(
    public shopping: ShoppingService
  ) { }

  /**
   * Método para inicializar el componente
   */
  ngOnInit() {
    this.disponibilidadOptions = [
      { label: 'No aplicar', value: null },
      { label: 'Si', value: true },
      { label: 'No', value: false },
    ];
    
    this.cantidadOptions = [
      { label: 'No aplicar', value: null },
      { label: '0 a 100', value: '0-100' },
      { label: '100 a 500', value: '100-500' },
      { label: '500 a 1000', value: '500-1000' },
      { label: '1000 a 2000', value: '1000-2000' },
    ];

    this.preciosOptions = [
      { label: 'No aplicar', value: null },
      { label: '$0 a $1,000', value: '0-1.000' },
      { label: '$1,000 a $2,000', value: '1.000-2.000' },
      { label: '$2,000 a $5,000', value: '2.000-5.000' },
      { label: '$5,000 a $10,000', value: '5.000-10.000' },
      { label: '$10,000 a $20,000', value: '10.000-20.000' },
    ];
  }

  /**
   * Método para aplicar los filtros adicionales
   */
  onChangeFilter() {
    this.shopping.dispSelected = this.dispSelected;
    this.shopping.cantidadSelected = this.cantidadSelected;
    this.shopping.preciosSelected = this.preciosSelected;
    this.shopping.applyFilters();
  }

}
