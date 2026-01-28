module LegalEntityTypes
  class FilterQuery
    def initialize(scope:, params:)
      @scope = scope
      @params = params
    end

    def call
      scope
        .then { |query| filter_by_status(query) }
        .then { |query| search_by_keyword(query) }
        .then { |query| order_results(query) }
    end

    private

    attr_reader :scope, :params

    def filter_by_status(query)
      return query if params[:status].blank?

      query.where(status: params[:status])
    end

    def search_by_keyword(query)
      return query if params[:q].blank?

      keyword = "%#{params[:q]}%"
      query.where("name ILIKE ? OR key ILIKE ?", keyword, keyword)
    end

    def order_results(query)
      order_by = params[:order_by].presence || "created_at"
      order_direction = params[:order_direction].presence || "desc"

      if LegalEntityType.column_names.include?(order_by)
        query.order("#{order_by} #{order_direction}")
      else
        query.order(created_at: :desc)
      end
    end
  end
end
