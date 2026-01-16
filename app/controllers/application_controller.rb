class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  protect_from_forgery with: :null_session
  before_action :set_current_tenant

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid do |e|
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end
  rescue_from FormSubmissions::BaseTransition::InvalidTransition do |e|
    render json: { error: e.message }, status: :unprocessable_entity
  end
  rescue_from MissingRequiredFields do |e|
    render json: {
      error: e.message,
      missing_fields: e.missing_fields
    }, status: :unprocessable_entity
  end

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
end
