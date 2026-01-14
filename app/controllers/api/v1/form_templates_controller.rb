class Api::V1::FormTemplatesController < ApplicationController
  # GET /api/v1/form_templates
  def index
    order_hash = safe_order_hash(
      model: FormTemplate,
      default: [ "created_at" ],
      default_dir: "desc"
    )
    puts "Order Hash: #{order_hash.inspect}"
    templates = current_tenant.form_templates.order(order_hash)
    render json: templates, status: :ok
  end

  # GET /api/v1/form_templates/:id
  def show
    template = current_tenant.form_templates.find(params[:id])
    render json: template, status: :ok
  end

  # POST /api/v1/form_templates
  def create
    template = current_tenant.form_templates.new(form_template_params)
    template.status = "draft"
    template.published_at = nil
    template.archived_at = nil

    if template.save
      render json: template, status: :created
    else
      render json: { errors: template.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PUT /api/v1/form_templates/:id
  def update
    template = current_tenant.form_templates.find(params[:id])
    if template.status != "draft"
      return render json: { error: "Only draft templates can be updated" }, status: :unprocessable_entity
    end
    if template.update(form_template_params)
      render json: template, status: :ok
    else
      render json: { errors: template.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/form_templates/:id
  def destroy
    template = current_tenant.form_templates.find(params[:id])
    template.destroy
    head :no_content
  end

  # POST /api/v1/form_templates/:id/publish
  def publish
    template = current_tenant.form_templates.find(params[:id])
    if template.published_status?
      return render json: { error: "Template is already published" }, status: :unprocessable_entity
    end
    if template.archived_status?
      return render json: { error: "Template is archived and cannot be published" }, status: :unprocessable_entity
    end
    template.status = "published"
    template.published_at = Time.current
    template.archived_at = nil
    if template.save
      render json: template, status: :ok
    else
      render json: { errors: template.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /api/v1/form_templates/:id/unpublish
  def unpublish
    template = current_tenant.form_templates.find(params[:id])
    if template.draft_status?
      return render json: { error: "Template is already in draft status" }, status: :unprocessable_entity
    end
    if template.archived_status?
      return render json: { error: "Template is archived and cannot be unpublished" }, status: :unprocessable_entity
    end
    template.status = "draft"
    template.published_at = nil
    if template.save
      render json: template, status: :ok
    else
      render json: { errors: template.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /api/v1/form_templates/:id/archive
  def archive
    template = current_tenant.form_templates.find(params[:id])
    if template.archived_status?
      return render json: { error: "Template is already archived" }, status: :unprocessable_entity
    end
    template.status = "archived"
    template.archived_at = Time.current
    if template.save
      render json: template, status: :ok
    else
      render json: { errors: template.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # POST /api/v1/form_templates/:id/restore
  def restore
    template = current_tenant.form_templates.find(params[:id])
    if template.draft_status?
      return render json: { error: "Template is already in draft status" }, status: :unprocessable_entity
    end
    if template.published_status?
      return render json: { error: "Template is already in published status" }, status: :unprocessable_entity
    end
    template.status =  template.published_at.present? ? "published" : "draft"
    template.archived_at = nil
    if template.save
      render json: template, status: :ok
    else
      render json: { errors: template.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def form_template_params
    params.require(:form_template).permit(
      :name,
      :slug,
      :template_type,
      :access_type
    )
  end
end
