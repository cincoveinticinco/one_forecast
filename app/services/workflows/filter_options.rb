module Workflows
  class FilterOptions
    def self.call
      {
        workflow_types: Workflow::WORKFLOW_TYPES,
        statuses: Workflow::STATUSES,
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
