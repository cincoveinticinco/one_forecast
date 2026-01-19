class ApplicationController < ActionController::Base
  include Pagy::Backend

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  protect_from_forgery with: :null_session
  before_action :set_current_tenant

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  rescue_from FormSubmissions::BaseTransition::InvalidTransition, with: :invalid_transition
  rescue_from MissingRequiredFields, with: :missing_required_fields

  include OrderableParams

  private

  def set_current_tenant
    # For development/testing purposes only
    tenant = Tenant.find(1)
    # tenant_id = request.headers["X-Tenant-ID"]

    # return render(json: { error: "X-Tenant-ID header is required" }, status: :bad_request) if tenant_id.blank?

    # tenant = Tenant.find_by(id: tenant_id)
    # return render(json: { error: "Tenant not found" }, status: :not_found) if tenant.nil?

    # allowed = TenantMembership.exists?(tenant_id: tenant.id, user_id: current_user.id)
    # return render(json: { error: "Forbidden for this tenant" }, status: :forbidden) unless allowed

    Current.tenant = tenant
  end

  def current_tenant
    Current.tenant
  end

  def record_not_found
    render json: {
      error: "Record not found"
    }, status: :not_found
  end

  def record_invalid
    render json: {
      errors: e.record.errors.full_messages
    }, status: :unprocessable_entity
  end

  def invalid_transition(e)
    render json: {
      error: e.message
    }, status: :unprocessable_entity
  end
  
  def missing_required_fields(e)
    render json: {
      error: e.message,
      missing_fields: e.missing_fields
    }, status: :unprocessable_entity
  end

  def pagination_data(pagy)
    {
      page: pagy.page,
      total_pages: pagy.pages,
      total_count: pagy.count
    }
  end
end
