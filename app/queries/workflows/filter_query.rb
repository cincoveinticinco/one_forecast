module Workflows
  class FilterQuery
    ALLOWED_ORDER_COLUMNS = %w[name created_at updated_at].freeze

    def initialize(scope:, params:)
      @scope = scope
      @params = params
    end

    def call
      scope
        .then { |query| filter_by_workflow_type(query) }
        .then { |query| filter_by_status(query) }
        .then { |query| search_by_name(query) }
        .then { |query| order_results(query) }
    end

    private

    attr_reader :scope, :params

    def filter_by_workflow_type(query)
      return query if params[:workflow_type].blank?

      query.where(workflow_type: params[:workflow_type])
    end

    def filter_by_status(query)
      return query if params[:status].blank?

      query.where(status: params[:status])
    end

    def search_by_name(query)
      return query if params[:search].blank?

      query.where("name LIKE ?", "%#{params[:search]}%")
    end

    def order_results(query)
      column = params[:order].presence&.in?(ALLOWED_ORDER_COLUMNS) ? params[:order] : "created_at"
      direction = params[:direction].presence&.in?(%w[asc desc]) ? params[:direction] : "desc"

      query.order("#{column} #{direction}")
    end
  end
end
