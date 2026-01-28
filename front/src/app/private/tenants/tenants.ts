import { Component, inject, OnInit, signal } from '@angular/core';
import { ITenant } from '../../interfaces/tenant.interface';
import { Button } from 'primeng/button';
import { TenantService } from '../../services/tenants/tenant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tenants',
  imports: [Button],
  templateUrl: './tenants.html',
  styleUrl: './tenants.scss',
})
export class Tenants implements OnInit {

  private tenantService = inject(TenantService);
  private router = inject(Router);
  protected loading = signal(true);
  protected tenants = signal<ITenant[]>([]);

  async ngOnInit(): Promise<void> {
    this.tenants.set(await this.tenantService.findAll());
    this.loading.set(false);
  }

  protected navigateTo(url: string, tenantId: number) {
    this.router.navigate([tenantId, url]);
  }

}
