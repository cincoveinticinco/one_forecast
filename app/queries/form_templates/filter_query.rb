module FormTemplates
  class FilterQuery
    ALLOWED_ORDER_COLUMNS = %w[
      created_at
      updated_at
      name
      status
      template_type
      access_type
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
        .then { |s| filter_by_template_type(s) }
        .then { |s| filter_by_access_type(s) }
        .then { |s| filter_by_target_entity(s) }
        .then { |s| search(s) }

    def filter_by_target_entity(s)
      return s unless params[:target_entity].present?
      s.where(target_entity: params[:target_entity])
    end
    end

    def filter_by_status(s)
      return s unless params[:status].present?

      s.where(status: params[:status])
    end

    def filter_by_template_type(s)
      return s unless params[:template_type].present?

      s.where(template_type: params[:template_type])
    end

    def filter_by_access_type(s)
      return s unless params[:access_type].present?

      s.where(access_type: params[:access_type])
    end

    def search(s)
      return s unless params[:search].present?

      term = "%#{params[:search]}%"
      s.where("name LIKE :term OR slug LIKE :term", term: term)
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
