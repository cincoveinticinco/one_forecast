module FormFields
  module Visibility
    class OperatorRegistry
      OPERATORS = {
        "==" => ->(a, b) { a == b },
        "!="     => ->(a, b) { a != b },
        ">"      => ->(a, b) { a.to_f > b.to_f },
        ">="     => ->(a, b) { a.to_f >= b.to_f },
        "<"      => ->(a, b) { a.to_f < b.to_f },
        "<="     => ->(a, b) { a.to_f <= b.to_f }
      }.freeze

      def self.fetch(op)
        OPERATORS.fetch(op) do
          raise ArgumentError, "Unsupported visibility operator: #{op}"
        end
      end

      def self.supported?(op)
        OPERATORS.key?(op)
      end
    end
  end
end
