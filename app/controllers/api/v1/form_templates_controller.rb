class Api::V1::FormTemplatesController < ApplicationController
  include Pagy::Backend
  before_action :set_tenant, only: [:index, :show, :destroy]
  before_action :set_template, only: [:show, :update, :destroy, :publish, :unpublish, :archive, :restore]

  def index
    query = FormTemplates::IndexQuery.new(
      scope: @tenant.form_templates,
      params: params
    )
    pagy, form_templates = pagy(
      query.call,
      page: params[:page]
    )
    render json: {
      data: FormTemplateSerializer.new(form_templates).as_json,
      pagination: pagination_data(pagy)
    }, status: :ok
  end

  # GET /api/v1/form_templates/:id
  def show
    template = FormTemplateSerializer.new(@template).as_json
    render json: template, status: :ok
  end

  def create
    template = @tenant.form_templates.new(form_template_params)
    if template.save
      render json: template, status: :created
    else
      render json: { errors: template.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @template.update(form_template_params.except(:tenant_id))
      render json: @template, status: :ok
    else
      render json: { errors: @template.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/form_templates/:id
  def destroy
    @template.destroy
    head :no_content
  end

  # POST /api/v1/form_templates/:id/publish
  def publish
    if @template.published_status?
      return render json: { error: "Template is already published" }, status: :unprocessable_entity
    end
    if @template.archived_status?
      return render json: { error: "Template is archived and cannot be published" }, status: :unprocessable_entity
    end
    @template.status = "published"
    @template.published_at = Time.current
    @template.archived_at = nil
    if @template.save
      render json: @template, status: :ok
    else
      render json: { errors: @template.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /api/v1/form_templates/:id/unpublish
  def unpublish
    if @template.draft_status?
      return render json: { error: "Template is already in draft status" }, status: :unprocessable_entity
    end
    if @template.archived_status?
      return render json: { error: "Template is archived and cannot be unpublished" }, status: :unprocessable_entity
    end
    @template.status = "draft"
    @template.published_at = nil
    if @template.save
      render json: @template, status: :ok
    else
      render json: { errors: @template.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /api/v1/form_templates/:id/archive
  def archive
    if @template.archived_status?
      return render json: { error: "Template is already archived" }, status: :unprocessable_entity
    end
    @template.status = "archived"
    @template.archived_at = Time.current
    if @template.save
      render json: @template, status: :ok
    else
      render json: { errors: @template.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /api/v1/form_templates/:id/restore
  def restore
    if @template.draft_status?
      return render json: { error: "Template is already in draft status" }, status: :unprocessable_entity
    end
    if @template.published_status?
      return render json: { error: "Template is already in published status" }, status: :unprocessable_entity
    end
    @template.status =  @template.published_at.present? ? "published" : "draft"
    @template.archived_at = nil
    if @template.save
      render json: @template, status: :ok
    else
      render json: { errors: @template.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def set_tenant
    @tenant = Tenant.find(params[:tenant_id])
  end
  def set_template
    @template = FormTemplate.find(params[:id])
  end
  def form_template_params
    raw = params.require(:form_template).permit(
      :name,
      :slug,
      :template_type,
      :access_type,
      :tenant_id
    )

    sanitize_enum!(raw, :template_type, FormTemplate::TEMPLATE_TYPES)
    sanitize_enum!(raw, :status, FormTemplate::STATUSES)
    sanitize_enum!(raw, :access_type, FormTemplate::ACCESS_TYPES)

    raw
  end
end
