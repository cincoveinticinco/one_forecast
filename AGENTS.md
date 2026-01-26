# OneForecast - Coding Agent Guidelines

This document provides comprehensive guidelines for coding agents working on the OneForecast vendor management platform.

## Development Commands

### Build & Setup
```bash
# Database setup
rails db:create db:migrate
rails db:seed

# Server
rails server                    # Development server
rails s -e test                 # Test environment server
```

### Linting & Code Quality
```bash
bundle exec rubocop                    # Check code style
bundle exec rubocop --auto-correct     # Auto-fix issues
bundle exec brakeman                   # Security vulnerability scan
```

### Testing
```bash
rails test                    # Run all tests (parallel)
rails test:models            # Run model tests only
rails test:controllers       # Run controller tests only
rails test:system            # Run system tests

# Single test execution
rails test test/models/form_template_test.rb                    # Single test file
rails test test/models/form_template_test.rb:15                # Specific test method
rails test test/controllers/api/v1/form_templates_controller_test.rb:25
```

### Database Operations
```bash
rails db:migrate              # Run migrations
rails db:rollback             # Rollback last migration
rails db:reset                # Reset database completely
rails db:schema:load          # Load schema without migrations
```

## Code Style Guidelines

### Naming Conventions
- **Methods**: snake_case (`form_template_params`, `validate_submission`)
- **Classes/Modules**: PascalCase (`FormTemplate`, `FormFields::VisibilityEvaluator`)
- **Files**: snake_case (`form_template_serializer.rb`, `missing_required_fields.rb`)
- **Constants**: SCREAMING_SNAKE_CASE (`TEMPLATE_TYPES`, `ORDERABLE_COLUMNS`)

### String & Hash Conventions
```ruby
# Use double quotes consistently
error_message = "Record not found"
response = { error: "Invalid template status" }

# Modern hash syntax with symbol keys
params = { name: "Test", status: :published, tenant_id: current_user.tenant_id }
```

### Method Definitions
```ruby
# Service object pattern with keyword arguments
def initialize(form_submission:, field_key:, value:)
  @form_submission = form_submission
  @field_key = field_key
  @value = value
end

# Main entry point
def call
  validate!
  process!
  
  result
end
```

### Indentation & Formatting
- **2 spaces** for indentation
- **Method grouping**: Extensions → Concerns → Associations → Validations → Constants
- **Line breaks**: Logical separation between related methods

## Architecture Patterns

### Service Objects
Follow the established service object pattern:
```ruby
module FormTemplates
  class Duplicate
    def initialize(form_template)
      @form_template = form_template
    end

    def call
      ActiveRecord::Base.transaction do
        validate!
        create_duplicate!
        copy_fields!
      end

      @new_template
    end

    private

    attr_reader :form_template
    
    def validate!
      raise InvalidTransitionError, "Template must be saved" unless form_template.persisted?
    end
  end
end
```

### Namespacing Organization
```ruby
# Domain-based namespacing
module FormTemplates
  module Status
    class Publish; end
    class Archive; end
  end
end

# Directory structure mirrors namespaces
# app/services/form_templates/status/publish.rb
```

### Error Handling
Use custom exceptions with descriptive messages:
```ruby
class InvalidTransitionError < StandardError; end

class MissingRequiredFields < StandardError
  attr_reader :missing_fields
  
  def initialize(missing_fields)
    @missing_fields = missing_fields
    super("Missing required fields: #{missing_fields.join(', ')}")
  end
end
```

### Global Exception Handling
Centralized error handling in ApplicationController:
```ruby
rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
rescue_from InvalidTransitionError, with: :invalid_transition
rescue_from MissingRequiredFields, with: :missing_required_fields
```

## Database Guidelines

### Migration Naming
```bash
# Descriptive timestamped migrations
rails g migration AddFriendlyIdToFormTemplates
rails g migration CreateFormFields
rails g migration AddVisibilityRulesToFormFields
```

### Model Organization
```ruby
class FormTemplate < ApplicationRecord
  # Extensions first
  extend FriendlyId
  friendly_id :name, use: :slugged

  # Concerns
  include TemplateEnum

  # Associations
  belongs_to :tenant
  has_many :form_fields, dependent: :restrict_with_error, inverse_of: :form_template

  # Validations
  validates :name, :slug, presence: true
  validates :slug, uniqueness: { scope: :tenant_id }

  # Enums
  enum :template_type, { vendor_creation: "vendor_creation", vendor_update: "vendor_update" }
  enum :status, { draft: "draft", published: "published", archived: "archived" }

  # Constants
  ORDERABLE_COLUMNS = %w[created_at updated_at name].freeze
end
```

### Relationship Patterns
- **Explicit inverse relationships** for performance
- **Thoughtful dependency handling** (`dependent: :restrict_with_error` vs `dependent: :destroy`)
- **Scoped associations** with lambda scopes for filtering

### Enum Patterns
```ruby
# String-based enums with descriptive values
enum :status, { 
  draft: "draft", 
  published: "published", 
  archived: "archived" 
}

# Define constants for easy access
TEMPLATE_TYPES = template_types.keys
STATUSES = statuses.keys
```

## API Design Patterns

### Controller Organization
```ruby
class Api::V1::FormTemplatesController < ApplicationController
  before_action :set_tenant, only: [:index, :create]
  before_action :set_template, except: [:index, :create]

  # Consistent response patterns
  def index
    templates = filter_templates.page(params[:page])
    
    render json: {
      data: FormTemplateSerializer.new(templates).as_json,
      meta: pagination_meta(templates)
    }
  end

  private

  def set_template
    @template = current_tenant.form_templates.find(params[:id])
  end

  def form_template_params
    params.require(:form_template).permit(:name, :template_type, fields: [:id, :field_key, :field_type])
  end
end
```

### Parameter Handling
- **Always use strong parameters** with `require` and `permit`
- **Sanitize enum values** with custom validation methods
- **Support nested parameters** for complex form structures

### Response Formatting
```ruby
# Consistent JSON structure
{
  "data": {...},
  "meta": {
    "current_page": 1,
    "total_pages": 5,
    "total_count": 42
  },
  "links": {...}
}

# Error responses
{
  "error": "Record not found"
}

# Validation errors
{
  "errors": ["Name can't be blank", "Slug has already been taken"]
}
```

## Specialized Patterns

### Validators
```ruby
# Factory pattern for validators
class ValidatorFactory
  def self.create(field_type, validation)
    case validation[:type]
    when 'minlength'
      MinlengthValidator.new(validation[:value])
    when 'pattern'
      PatternValidator.new(validation[:value])
    end
  end
end
```

### Serializers
```ruby
class FormTemplateSerializer
  def initialize(form_templates)
    @form_templates = form_templates
  end

  def as_json(*)
    if form_templates.respond_to?(:each)
      form_templates.map { |template| serialize_template(template) }
    else
      serialize_template(form_templates)
    end
  end

  private

  attr_reader :form_templates
end
```

### Query Objects
```ruby
class FormSubmissions::FilterSubmissionsQuery
  def initialize(scope, filters)
    @scope = scope
    @filters = filters
  end

  def call
    scope
      .then { |query| filter_by_status(query) }
      .then { |query| filter_by_date_range(query) }
      .then { |query| search_by_keyword(query) }
  end

  private

  attr_reader :scope, :filters
end
```

## File Organization

### Directory Structure
```
app/
├── controllers/api/v1/     # API controllers with versioning
├── models/                 # ActiveRecord models
├── models/concerns/        # Model concerns by domain
├── services/               # Business logic services
├── services/domain/        # Domain-specific services
├── serializers/            # JSON response formatters
├── validators/             # Custom validation logic
├── validators/domain/     # Domain-specific validators
├── queries/                # Complex database queries
├── errors/                 # Custom exception classes
├── jobs/                   # Background job processing
└── mailers/                # Email handling
```

### File Naming Rules
- **One class per file** - Never multiple classes in one file
- **Descriptive names** - Files should clearly indicate their purpose
- **Match module structure** - Directory structure mirrors module hierarchy

## Testing Guidelines

### Test Structure
```ruby
class FormTemplateTest < ActiveSupport::TestCase
  # Setup fixtures and test data
  setup do
    @tenant = tenants(:default)
  end

  # Group related tests together
  test "should create form template with valid attributes" do
    template = @tenant.form_templates.build(name: "Test Template", template_type: "vendor_creation")
    
    assert template.valid?
    assert template.save
  end

  test "should validate slug uniqueness within tenant" do
    existing_template = form_templates(:vendor_creation)
    template = @tenant.form_templates.build(name: existing_template.name, template_type: "vendor_update")
    
    assert_not template.valid?
    assert_includes template.errors[:slug], "has already been taken"
  end
end
```

### Parallel Testing
The project uses parallel testing. Ensure tests are:
- **Independent** - Don't rely on other tests
- **Isolated** - Clean up after each test
- **Deterministic** - Same result regardless of order

## Security Guidelines

### Multi-Tenancy
- **Always scope queries by tenant** - `current_tenant.form_templates`
- **Validate tenant ownership** - Ensure users can only access their tenant's data
- **Use tenant-aware routing** - Include tenant context in all operations

### Parameter Sanitization
- **Use strong parameters** consistently
- **Sanitize enum values** against defined values
- **Validate nested structures** for form fields and options

### Error Handling
- **Don't expose internal details** in error messages
- **Log security-relevant events** for auditing
- **Use consistent error responses** without stack traces

## Performance Guidelines

### Database Optimization
- **Avoid N+1 queries** - Use `includes`, `joins`, or `preload`
- **Add appropriate indexes** - Based on query patterns
- **Use pagination** - For large datasets with Pagy

### Caching Strategy
- **Use Solid Cache** for Rails caching
- **Cache expensive computations** - Like form field evaluations
- **Implement fragment caching** - For complex form rendering

This document serves as a comprehensive reference for maintaining consistency and quality across the OneForecast codebase.