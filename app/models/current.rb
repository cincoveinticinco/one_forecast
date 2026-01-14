class Current < ActiveSupport::CurrentAttributes
   attribute :tenant, :user
   # Add other attributes as needed
end
