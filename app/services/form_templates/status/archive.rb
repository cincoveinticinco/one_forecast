module FormTemplates
  module Status
    class Archive
      def initialize(form_template)
        @form_template = form_template
      end

      def call
        validate!
        archive!

        form_template
      end

      private

      attr_reader :form_template

      def validate!
        return if form_template.draft?

        raise InvalidTransitionError, "Only draft templates can be archived"
      end

      def archive!
        form_template.update!(
          status: :archived,
          archived_at: Time.current
        )
      end
    end
  end
end
