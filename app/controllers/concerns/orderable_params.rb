module OrderableParams
  extend ActiveSupport::Concern

  # Returns a hash ready for ActiveRecord.order(...)
  #
  # Supports:
  # - ?order_by=name
  # - ?order_by[]=name&order_by[]=created_at
  # - ?order_by=name,created_at
  # - ?order_dir=asc|desc
  #
  def safe_order_hash(model:, default: ["created_at"], default_dir: "desc")
    allowed_dir = %w[asc desc].freeze
    allowed_order_by =
      if model.const_defined?(:ORDERABLE_COLUMNS)
        model::ORDERABLE_COLUMNS
      else
        %w[created_at updated_at name]
      end
    
    order_dir = params['order_dir'].to_s.presence_in(allowed_dir) || default_dir

    raw = Array.wrap(params['order_by'])
              .flat_map { |v| v.to_s.split(",") }
              .map(&:strip)

    cols = raw.select { |col| allowed_order_by.include?(col) }
    cols = default if cols.empty?

    cols.index_with { order_dir }
  end
end
