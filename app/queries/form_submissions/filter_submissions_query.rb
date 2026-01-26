module FormSubmissions
  class FilterSubmissionsQuery
    ALLOWED_ORDER_COLUMNS = %w[
      submitted_at
      created_at
      updated_at
      status
    ].freeze

    ALLOWED_ORDER_DIRECTIONS = %w[asc desc].freeze
    FILTER_PREFIX = "filter_"

    def initialize(scope:, params:)
      @scope = scope
      @params = params
    end

    def call
      filtered_scope.then { |s| apply_order(s) }
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
        .then { |s| filter_by_search(s) }
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
      return s unless has_field_filters?

      all_conditions = []
      all_bind_values = []

      field_filters.each do |field_key, values|
        value_conditions = values.map { "JSON_UNQUOTE(form_submission_values.value) LIKE ?" }.join(" OR ")

        all_conditions << "EXISTS (
          SELECT 1 FROM form_submission_values
          INNER JOIN form_fields ON form_fields.id = form_submission_values.form_field_id
          WHERE form_submission_values.form_submission_id = form_submissions.id
            AND form_fields.key = ?
            AND (#{value_conditions})
        )"

        all_bind_values << field_key
        all_bind_values.concat(values.map { |v| "%#{v}%" })
      end
      s.where(all_conditions.join(" AND "), *all_bind_values)
    end

    def filter_by_search(s)
      return s unless params[:search].present?

      s.search_by_submission(params[:search])
    end

    def apply_order(s)
      return s.order(created_at: :desc) unless valid_order?

      s.order(order_column => order_direction)
    end

    def has_field_filters?
      params.keys.any? { |key| key.to_s.start_with?(FILTER_PREFIX) }
    end

    def field_filters
      result = {}

      params.each do |param_key, param_values|
        next unless param_key.to_s.start_with?(FILTER_PREFIX)

        field_key = extract_field_key(param_key)
        values = sanitize_values(param_values)

        result[field_key] = values if values.any?
      end

      result
    end

    def extract_field_key(param_key)
      param_key.to_s.delete_prefix(FILTER_PREFIX).delete_suffix("[]")
    end

    def sanitize_values(param_values)
      Array(param_values).compact.reject(&:blank?)
    end

    def valid_order?
      ALLOWED_ORDER_COLUMNS.include?(order_column) &&
        ALLOWED_ORDER_DIRECTIONS.include?(order_direction)
    end

    def order_column
      params[:order_by]
    end

    def order_direction
      params[:order_dir] || "asc"
    end
  end
end
