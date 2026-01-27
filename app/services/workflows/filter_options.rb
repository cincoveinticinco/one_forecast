module Workflows
  class FilterOptions
    def self.call
      {
        status: Workflow.distinct.pluck(:status),
        workflow_type: Workflow.distinct.pluck(:workflow_type),
        order: order_options
      }
    end

    private

    def self.order_options
      FilterQuery::ALLOWED_ORDER_COLUMNS.flat_map do |column|
        [
          "#{column}"
        ]
      end
    end
  end
end
