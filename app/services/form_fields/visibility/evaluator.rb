module FormFields
  module Visibility
    class Evaluator
      def initialize(form_field:, submission_values:, available_keys:)
        @form_field = form_field
        @submission_values = submission_values
        @available_keys = available_keys
      end

      def visible?
        rules = @form_field.visibility_rules || {}

        show_if = rules["show_if"]
        hide_if = rules["hide_if"]

        return false if hide_if&.any? { |r| rule_matches?(r) }
        return true unless show_if.present?

        show_if.all? { |r| rule_matches?(r) }
      end

      private

      def rule_matches?(rule_hash)
        rule_obj = rule(rule_hash)
        return false if rule_obj.nil?

        field_id = rule_obj.field_id
        submission_value = @submission_values[field_id]
        rule_obj.matches?(submission_value)
      end

      def rule(rule_hash)
        keys = @available_keys.map { |k| k[:key] }

        rule = Rule.new(rule_hash, @available_keys)
        validation_result = rule.valid_definition!(keys)
        return nil unless validation_result[:valid]

        rule
      end
    end
  end
end
