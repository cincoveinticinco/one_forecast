module FormTemplates
  module Status
    class Publish
      def initialize(form_template)
        @form_template = form_template
      end

      def call
        validate!
        publish!

        form_template
      end

      private

      attr_reader :form_template

      def validate!
        return if form_template.draft?

        raise InvalidTransitionError, "Only draft templates can be published"
      end

      def publish!
        form_template.update!(
          status: :published,
          published_at: Time.current
        )
      end
    end
  end
end
