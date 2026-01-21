module FormFields
  module Visibility
    class Rule
      attr_reader :field_key, :operator, :expected_value, :field_id

      def initialize(rule_hash, available_keys = [])
        @field_key = rule_hash.fetch("field_key")
        @operator  = rule_hash.fetch("op")
        @expected_value = rule_hash["value"]
        @field_id = available_keys.find { |k| k[:key] == @field_key }&.dig(:id)
      end

      def valid_definition!(available_keys)
        unless available_keys.include?(field_key)
          raise ArgumentError, "Visibility rule references unknown field_key: #{field_key}"
        end

        unless OperatorRegistry.supported?(operator)
          raise ArgumentError, "Invalid visibility operator: #{operator}"
        end
      end

      def matches?(submission_values)
        actual_value = submission_values&.value
        return false if actual_value.nil?
        OperatorRegistry
          .fetch(operator)
          .call(actual_value, expected_value)
      end
    end
  end
end
