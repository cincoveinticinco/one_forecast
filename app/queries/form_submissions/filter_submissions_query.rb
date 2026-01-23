module FormSubmissions
  class FilterSubmissionsQuery
    ALLOWED_ORDER_COLUMNS = %w[
      submitted_at
      created_at
      updated_at
      status
    ].freeze

    ALLOWED_ORDER_DIRECTIONS = %w[asc desc].freeze

    def initialize(scope:, params:)
      @scope = scope
      @params = params
    end

    def call
      filtered_scope
        .then { |s| apply_order(s) }
    end

    private

    attr_reader :scope, :params

    def filtered_scope
      scope
        .then { |s| filter_by_status(s) }
        .then { |s| filter_by_submitted_at_from(s) }
        .then { |s| filter_by_submitted_at_to(s) }
        .then { |s| filter_by_include_deleted(s) }
        .then { |s| filter_by_field_key(s) }
    end

    def filter_by_status(s)
      return s unless params[:status].present?

      s.where(status: params[:status])
    end

    def filter_by_submitted_at_from(s)
      return s unless params[:submitted_at_from].present?

      s.where("submitted_at >= ?", params[:submitted_at_from])
    end

    def filter_by_submitted_at_to(s)
      return s unless params[:submitted_at_to].present?

      s.where("submitted_at <= ?", params[:submitted_at_to])
    end

    def filter_by_include_deleted(s)
      params[:include_deleted] == "true" ? s : s.where(deleted_at: nil)
    end

    def filter_by_field_key(s)
      return s unless params[:field_key].present?

      field_keys = Array(params[:field_key])
      s.joins(form_submission_values: :form_field)
       .where(form_fields: { key: field_keys })
       .distinct
    end

    def apply_order(s)
      column = params[:order_by]
      direction = params[:order_dir] || "asc"
      return s.order(created_at: :desc) unless valid_order?(column, direction)

      s.order(column => direction)
    end

    def valid_order?(column, direction)
      ALLOWED_ORDER_COLUMNS.include?(column) &&
        ALLOWED_ORDER_DIRECTIONS.include?(direction)
    end
  end
end
