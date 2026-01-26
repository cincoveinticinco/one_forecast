class Api::V1::FormTemplatesController < ApplicationController
  include Pagy::Backend
  before_action :set_tenant, only: [ :index, :show ]
  before_action :set_template, except: [ :index, :create, :filter_options ]
  before_action :set_workflow, only: [ :assign_workflow ]

  def index
    query = FormTemplates::FilterQuery.new(
      scope: @tenant.form_templates,
      params: params
    )
    pagy, form_templates = pagy(
      query.call,
      page: params[:page],
      limit: params[:limit]
    )
    render json: {
      data: FormTemplateSerializer.new(form_templates).as_json,
      pagination: pagination_data(pagy)
    }, status: :ok
  end

  def filter_options
    render json: FormTemplates::FilterOptions.call
  end
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

  def destroy
    @template.destroy!
    head :no_content
  end

  def publish
    template = FormTemplates::Status::Publish.new(@template).call
    render json: FormTemplateSerializer.new(template).as_json
  end

  def unpublish
    template = FormTemplates::Status::Unpublish.new(@template).call
    render json: FormTemplateSerializer.new(template).as_json
  end

  def archive
    template = FormTemplates::Status::Archive.new(@template).call
    render json: FormTemplateSerializer.new(template).as_json
  end

  def restore
    template = FormTemplates::Status::Restore.new(@template).call
    render json: FormTemplateSerializer.new(template).as_json
  end

  def duplicate
    template = FormTemplates::Duplicate.new(@template).call
    render json: FormTemplateSerializer.new(template).as_json, status: :created
  end

  def assign_workflow
    FormTemplates::AssignWorkflow.new(
      form_template: @template,
      workflow: @workflow
    ).call

    render json: { message: 'Workflow asignado correctamente' }
  rescue ActiveRecord::RecordInvalid => e
      render json: { error: e.message }, status: :unprocessable_entity
  end

  private
  def set_tenant
    @tenant = Tenant.find(params[:tenant_id])
  end
  def set_template
    @template = FormTemplate.find(params[:id])
  end

  def set_workflow
    @workflow = Workflow.find(params[:workflow_id])
  end
  def form_template_params
    raw = params.require(:form_template).permit(
      :name,
      :slug,
      :template_type,
      :access_type,
      :tenant_id,
      :workflow_id
    )

    sanitize_enum!(raw, :template_type, FormTemplate::TEMPLATE_TYPES)
    sanitize_enum!(raw, :status, FormTemplate::STATUSES)
    sanitize_enum!(raw, :access_type, FormTemplate::ACCESS_TYPES)

    raw
  end
end
