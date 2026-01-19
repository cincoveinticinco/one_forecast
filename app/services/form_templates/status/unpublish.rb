module FormTemplates
  module Status
    class Unpublish
      def initialize(form_template)
        @form_template = form_template
      end

      def call
        validate!
        unpublish!

        form_template
      end

      private
      
      attr_reader :form_template

      def validate!
        return if form_template.published?

        raise InvalidTransitionError, "Only published templates can be unpublished"
      end

      def unpublish!
        form_template.update!(
          status: :draft,
          published_at: nil
        )
      end
    end
  end
end