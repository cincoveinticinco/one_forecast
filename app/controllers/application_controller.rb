class ApplicationController < ActionController::Base
  include Pagy::Backend

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  protect_from_forgery with: :null_session

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  rescue_from FormSubmissions::BaseTransition::InvalidTransition, with: :invalid_transition
  rescue_from MissingRequiredFields, with: :missing_required_fields
  rescue_from Pagy::OverflowError, with: :handle_pagy_overflow_error
  rescue_from InvalidEnumFilter, with: :invalid_enum_filter

  include OrderableParams

  private

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

  def handle_pagy_overflow_error(e)
    render json: {
      error: e.message,
    }, status: :unprocessable_entity
  end

  def invalid_enum_filter(e)
    render json: {
      error: "Invalid enum value",
      field: e.field,
      invalid_values: e.invalid_values,
      allowed_values: e.allowed_values
    }, status: :unprocessable_entity
  end
  
  def pagination_data(pagy)
    {
      page: pagy.page,
      total_pages: pagy.pages,
      total_count: pagy.count
    }
  end

  def sanitize_enum!(params, field, allowed)
    return if params[field].blank?
    return if allowed.include?(params[field])

    raise InvalidEnumFilter.new(
      field: field,
      invalid_values: [params[field]],
      allowed_values: allowed
    )
  end
end
