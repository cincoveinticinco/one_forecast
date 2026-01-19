module FormTemplates
  module Status
    class Restore
      def initialize(form_template)
        @form_template = form_template
      end

      def call
        validate!
        restore!

        form_template
      end

      private
      
      attr_reader :form_template

      def validate!
        return if form_template.archived?

        raise InvalidTransitionError, "Only archived templates can be restored"
      end

      def restore!
        form_template.update!(
          status: form_template.published_at.present? ? "published" : "draft",
          archived_at: nil
        )
      end
    end
  end
end