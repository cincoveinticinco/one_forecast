import { Component, inject, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { DynamicTableBase } from '../../lib/dynamic-table.base';
import { IFormTemplate } from '../../interfaces/field-layout-back.interface';
import { TEMPLATE_COLUMNS } from './config/template_columns';
import { Table } from '../../components/table/lib/table/table';
import { TEMPLATE_ACTIONS, TEMPLATE_GLOBAL_ACTIONS } from './config/template_actions';
import { TenantService } from '../../services/tenants/tenant.service';
import { FormTemplateService } from '../../components/layout/services/form-template/form-template.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RenderFormLayout } from '../../components/render-form-layout/render-form-layout';
import { TEMPLATE_FORM_LAYOUT } from './config/template_form_layout';
import { cloneDeep } from 'lodash';
import { TableLazyLoadEvent } from 'primeng/table';
import { ShareTemplateUrl } from './modals/share-template-url/share-template-url';
import { setDataLayout } from '../../helpers/layout/set-data-layout';

@Component({
  selector: 'app-templates',
  imports: [Table, ToastModule, ConfirmDialogModule],
  templateUrl: './templates.html',
  styleUrl: './templates.scss',
})
export class Templates extends DynamicTableBase implements OnInit {

  protected templates: IFormTemplate[] = [];
  private tenantService = inject(TenantService);
  private formTemplateService = inject(FormTemplateService);
  private clipboard = inject(Clipboard);

  constructor() {
    super();
  }

  async ngOnInit(): Promise<void> {
    await this.getFilterOptions();
    this.columns.set(TEMPLATE_COLUMNS);
    this.actions.set(TEMPLATE_ACTIONS);
    this.globalActions.set(TEMPLATE_GLOBAL_ACTIONS);
  }

  getTemplates = async(event?: TableLazyLoadEvent) => {
    this.getPagination(event);
    const { data, pagination } = await this.tenantService.findTemplatesByTenant(this.id, this.filters());
    this.templates = data;
    this.pagination.set({...pagination, current_count: this.filters()['limit']});
  }

  override async getFilters(filters: Record<string, any>): Promise<void> {
    super.getFilters(filters);
    await this.getTemplates();
  }

  private async getFilterOptions() {
    this.filtersOptions.set(await this.formTemplateService.findFilterOptions());
  }

  async handleActions(action: {key: string, id: number}) {
    const actions: Record<string, Function> = {
      create: this.create,
      edit: this.edit,
      publish: this.publish,
      unpublish: this.unpublish,
      duplicate: this.duplicate,
      archive: this.archive,
      restore: this.restore,
      delete: this.delete,
      copyurl: this.copyUrl,
      shareurl: this.shareUrl,
      viewresponses: this.viewResponses,
      viewnewtemplate: this.viewNewTemplate,
      viewdraft: this.viewDraft,
    }
    await actions[action.key!](action.id);
  }

  private create = async () => {
    const layout = cloneDeep(TEMPLATE_FORM_LAYOUT);
    const create = async (body: {form_template: IFormTemplate}) => {
      await this.formTemplateService.create({...body.form_template, tenant_id: +this.id});
      await this.getTemplates();
      this.openToast('success', 'Form templated created');
      this.closeDialog();
    }
    this.dialog = {
      component: RenderFormLayout,
      header: 'Create form template',
      input_values: {
        layout,
        nextCallback: create
      }
    }
    this.openContentDialog();
  }

  private edit = async (id: number) => {
    // set information directly on the layout
    const layout = setDataLayout(cloneDeep(TEMPLATE_FORM_LAYOUT), this.templates, id);
    const edit = async (body: {form_template: IFormTemplate}) => {
      await this.formTemplateService.update(body.form_template, id);
      await this.getTemplates();
      this.openToast('success', 'Form template updated');
      this.closeDialog();
    }
    this.dialog = {
      component: RenderFormLayout,
      header: 'Edit form template',
      input_values: {
        layout,
        nextCallback: edit
      }
    }
    this.openContentDialog();
  }

  private publish = async (id: number) => {
    const publish = async () => {
      await this.formTemplateService.publish(id);
      await this.getTemplates();
      this.openToast('success', 'Form template published');
    }
    this.confirmationDialog = {
      header: 'Publish form template',
      message: 'Do you want to publish this form template?',
      on_accept: publish
    }
    this.openConfirmationDialog();
  }

  private unpublish = async (id: number) => {
    const unpublish = async () => {
      await this.formTemplateService.unpublish(id);
      await this.getTemplates();
      this.openToast('success', 'Form template unpublished');
    }
    this.confirmationDialog = {
      header: 'Unpublish form template',
      message: 'Do you want to unpublish this form template?',
      on_accept: unpublish
    }
    this.openConfirmationDialog();
  }

  private duplicate = async (id: number) => {
    const duplicate = async () => {
      await this.formTemplateService.duplicate(id);
      await this.getTemplates();
      this.openToast('success', 'Form template duplicated');
    }
    this.confirmationDialog = {
      header: 'Duplicate form template',
      message: 'Do you want to duplicate this form template?',
      on_accept: duplicate
    }
    this.openConfirmationDialog();
  }

  private archive = async (id: number) => {
    const archive = async () => {
      await this.formTemplateService.archive(id);
      await this.getTemplates();
      this.openToast('success', 'Form template archived');
    }
    this.confirmationDialog = {
      header: 'Archive form template',
      message: 'Do you want to archive this form template?',
      on_accept: archive
    }
    this.openConfirmationDialog();
  }

  private restore = async (id: number) => {
    const restore = async () => {
      await this.formTemplateService.restore(id);
      await this.getTemplates();
      this.openToast('success', 'restored');
    }
    this.confirmationDialog = {
      header: 'Restore form template',
      message: 'Do you want to restore this form template?',
      on_accept: restore
    }
    this.openConfirmationDialog();
  }

  private delete = async (id: number) => {
    const remove = async () => {
      await this.formTemplateService.remove(id);
      await this.getTemplates();
      this.openToast('success', 'Form template deleted');
    }
    this.confirmationDialog = {
      header: 'Delete form template',
      message: 'Do you want to delete this form template?',
      on_accept: remove
    }
    this.openConfirmationDialog();
  }

  private copyUrl = async (id: number) => {
    this.clipboard.copy(this.templates.find(template => template.id === id)?.url_front ?? '');
    this.openToast('info', 'Form template url copied');
  }

  private shareUrl = async (id: number) => {
    const close = () => {
      this.closeDialog();
    }
    const urlFront = this.templates.find(template => template.id === id)?.url_front;
    if (!this.templates.find(template => template.id === id)?.url_front) return;
    this.dialog = {
      component: ShareTemplateUrl,
      header: 'Share form template url',
      width: '25vw',
      input_values: {
        urlFront: urlFront,
        close: close
      }
    }
    this.openContentDialog();
  }

  private viewResponses = async (id: number) => {
    this.router.navigate([this.id, 'form_responses', id]);
  }
  
  private viewDraft = async (id: number) => {
    const urlFront = this.templates.find(template => template.id === id)?.url_front;
    this.router.navigate([urlFront, 1]);
  }
  
  private viewNewTemplate = async (id: number) => {
    const urlFront = this.templates.find(template => template.id === id)?.url_front;
    this.router.navigate([urlFront, 0]);
  }

}
