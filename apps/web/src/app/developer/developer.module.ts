import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SpinnerModule as UiSpinnerModule } from '@developer-network/ui';
import { AvatarModule as UiAvatarModule } from '@developer-network/ui';
import { NgSelectModule as UiCustomSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule as UiDatatableModule } from '@swimlane/ngx-datatable';
import { NgxMaskModule as UiMaskModule } from 'ngx-mask';
import { BsDropdownModule as UiDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule as UiModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule as UiTooltipModule } from 'ngx-bootstrap/tooltip';
import { PopoverModule as UiPopoverModule } from 'ngx-bootstrap/popover';

import { DeveloperRouting } from './developer.routing';
import { DeveloperComponent } from './developer.component';
import { DeveloperListComponent } from './components/developer-list/developer-list.component';
import { DeveloperFormFilterComponent } from './components/developer-form-filter/developer-form-filter.component';
import { DeveloperCreateComponent } from './components/developer-create/developer-create.component';
import { DeveloperUpdateComponent } from './components/developer-update/developer-update.component';
import { DeveloperDeleteComponent } from './components/developer-delete/developer-delete.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DeveloperRouting,
    UiSpinnerModule,
    UiAvatarModule,
    UiCustomSelectModule,
    UiDatatableModule,
    UiMaskModule.forRoot(),
    UiDropdownModule.forRoot(),
    UiModalModule.forRoot(),
    UiTooltipModule.forRoot(),
    UiPopoverModule.forRoot()
  ],
  declarations: [
    DeveloperComponent,
    DeveloperListComponent,
    DeveloperFormFilterComponent,
    DeveloperCreateComponent,
    DeveloperUpdateComponent,
    DeveloperDeleteComponent
  ]
})
export class DeveloperModule { }
