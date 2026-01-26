# OneForecast - Project Structure Documentation

## Overview

OneForecast is a multi-tenant form management platform specifically designed for vendor onboarding and management processes. Built on Rails 8.0.4 with modern tooling including Hotwire, Stimulus, and ImportMaps.

## Architecture

- **Framework**: Ruby on Rails 8.0.4
- **Database**: MySQL with multi-database setup (main, cache, queue, cable)
- **Pattern**: Service-oriented architecture with clear separation of concerns
- **Deployment**: Kamal for containerized deployment

## Directory Structure

```
app/
├── controllers/          # API controllers
├── models/              # ActiveRecord models
├── services/            # Business logic services
├── serializers/         # JSON response formatters
├── validators/          # Custom validation logic
├── queries/            # Database query objects
├── errors/             # Custom exception classes
├── jobs/               # Background job processing
└── mailers/            # Email handling
```

## Models (`app/models/`)

### Core Domain Models

#### `tenant.rb`
- **Purpose**: Central multi-tenancy entity
- **Key Features**: FriendlyId support for SEO-friendly URLs
- **Relationships**: `has_many :form_templates, :workflows`
- **Validations**: Slug format and uniqueness

#### `form_template.rb`
- **Purpose**: Core form definition entity
- **Template Types**: 
  - `vendor_creation` - New vendor registration
  - `vendor_update` - Existing vendor updates
  - `vendor_onboarding` - Vendor onboarding process
- **Access Types**: `internal`, `public_token`
- **Status Workflow**: `draft → published → archived`
- **Relationships**: `belongs_to :tenant`, `has_many :form_fields, :form_submissions`

#### `form_field.rb`
- **Purpose**: Dynamic form field definitions with hierarchical structure
- **Field Types**:
  - **Structure**: `heading`, `subheading`, `paragraph`, `section`, `repeatable_group`, `block`
  - **Input**: `text`, `textarea`, `number`, `date`, `email`, `phone`
  - **Selection**: `select`, `multiselect`, `checkbox`
- **Features**: Parent-child relationships, validation rules, visibility conditions
- **Configuration**: JSON-based validations, options, settings, mapping

#### `form_submission.rb`
- **Purpose**: Container for form submission data
- **Status Workflow**: `draft → submitted → reopened`
- **Features**: Soft delete support, submission tracking
- **Relationships**: `belongs_to :form_template`, `has_many :form_submission_values`

#### `form_submission_value.rb`
- **Purpose**: Stores actual form field data
- **Storage**: JSON format for flexible data types
- **Constraints**: Unique per submission+field combination

### Supporting Models

- **`workflow.rb`** - Business process definitions
- **`country.rb`** - Geographic reference data
- **`current.rb`** - Request context management

### Model Concerns

- `app/models/concerns/form_template/template_enum.rb` - Template types and status
- `app/models/concerns/form_field/field_type_enum.rb` - Field type validations
- `app/models/concerns/form_submission/status_enum.rb` - Submission status workflow

## Controllers (`app/controllers/api/v1/`)

### API-First Architecture

#### `form_templates_controller.rb`
- **Purpose**: Template lifecycle management
- **Features**:
  - CRUD operations with tenant scoping
  - Status transitions (publish, unpublish, archive, restore)
  - Template duplication
  - Field tree structure access
  - Filtering and pagination

#### `form_submissions_controller.rb`
- **Purpose**: Submission workflow management
- **Features**:
  - Multi-context access (tenant-scoped and direct)
  - Status transitions (submit, reopen)
  - Autosave functionality
  - Tree view with field relationships

#### `form_fields_controller.rb`
- **Purpose**: Dynamic field management
- **Features**: Field CRUD, hierarchy management, validation setup

#### `tenants_controller.rb`
- **Purpose**: Multi-tenant management
- **Features**: Tenant CRUD, configuration management

### Controller Concerns

- `app/controllers/concerns/orderable_params.rb` - Query parameter handling
- Base controllers for shared functionality

## Services (`app/services/`)

### Form Submission Services (`form_submissions/`)

#### Core Transition Services
- **`submit.rb`** - Handles form submission with comprehensive validation
- **`reopen.rb`** - Manages reopening of submitted forms
- **`base_transition.rb`** - Shared transition logic and state management

#### Validation Services
- **`validate_values.rb`** - Field-level validation engine
- **`form_submission_service.rb`** - Core submission operations
- **`filter_options.rb`** - Dynamic filter generation for submissions

### Form Template Services (`form_templates/`)

#### Status Management Services
- **`status/publish.rb`** - Template publishing workflow
- **`status/unpublish.rb`** - Template unpublishing workflow
- **`status/archive.rb`** - Template archiving workflow
- **`status/restore.rb`** - Template restoration workflow

#### Template Operations
- **`duplicate.rb`** - Template cloning with field relationships
- **`filter_options.rb`** - Template filtering logic

### Form Field Services (`form_fields/`)

#### Field Management
- **`form_field_service.rb`** - Field tree operations and hierarchy management

#### Visibility Engine (`visibility/`)
- **`evaluator.rb`** - Dynamic field visibility evaluation
- **`rule.rb`** - Visibility rule engine
- **`operator_registry.rb`** - Operator definitions for visibility rules

### Form Submission Values Services
- **`autosave.rb`** - Real-time value persistence

## Validators (`app/validators/form_fields/`)

### Validation Architecture

#### Core Components
- **`validator_factory.rb`** - Factory pattern for creating validators
- **`base_validator.rb`** - Shared validation logic and interface

#### Specific Validators
- **String Validators**: `minlength`, `maxlength`, `pattern`
- **Numeric Validators**: `min`, `max`
- **Date Validators**: `min_date`, `max_date`
- **Collection Validators**: `min_items`, `max_items`
- **Selection Validators**: `select`, `multiselect`, `checkbox`

## Queries (`app/queries/`)

### Database Query Objects
- **`form_submissions/filter_submissions_query.rb`** - Advanced submission filtering with multiple criteria
- **`form_templates/filter_query.rb`** - Template filtering logic with search capabilities

## Serializers (`app/serializers/`)

### API Response Formatters
- **`form_template_serializer.rb`** - Template JSON structure
- **`form_submission_serializer.rb`** - Submission JSON structure
- **`form_field_serializer.rb`** - Field JSON structure with hierarchy
- **`form_submission_values_serializer.rb`** - Values JSON structure
- **`workflow_serializer.rb`** - Workflow JSON structure

## Errors (`app/errors/`)

### Custom Exception Classes
- **`invalid_transition_error.rb`** - State transition violations
- **`missing_required_fields.rb`** - Required field validation failures
- **`form_validation_error.rb`** - General form validation errors
- **`invalid_enum_filter.rb`** - Enum filtering errors

## Configuration

### Key Configuration Files
- **`config/routes.rb`** - Comprehensive API routing with nested resources
- **`config/application.rb`** - Custom autoload paths for errors and validators
- **`config/initializers/cors.rb`** - CORS configuration for API access
- **`config/initializers/pagy.rb`** - Pagination setup
- **`config/initializers/friendly_id.rb`** - URL slug configuration

### Database Configuration
- Multi-database setup: main, cache, queue, cable
- MySQL primary database
- Solid Cache, Solid Queue, Solid Cable for modern Rails features

## Database Schema Highlights

### Migration Timeline
1. **Tenants** (2026-01-07) - Multi-tenancy foundation
2. **Form Templates** (2026-01-08) - Core form definitions
3. **Form Fields** (2026-01-08) - Dynamic field system
4. **Countries** (2026-01-14) - Geographic support
5. **Form Submissions** (2026-01-14) - Submission tracking
6. **Workflows** (2026-01-20) - Business process support
7. **Friendly ID** (2026-01-22) - SEO-friendly URLs

### Schema Features
- JSON columns for flexible configuration storage
- Comprehensive indexing strategy for performance
- Foreign key constraints for data integrity
- Unique constraints to prevent duplicates
- Soft delete support with `deleted_at` timestamps

## Business Domain

### Vendor Management Platform
OneForecast is specifically designed for vendor onboarding and management:

1. **Multi-tenant SaaS** - Each organization manages their vendor processes independently
2. **Dynamic form creation** - Flexible form building for different vendor interaction types
3. **Hierarchical field system** - Complex form structures with conditional logic
4. **Submission lifecycle** - Draft, submit, and reopen workflows
5. **Validation framework** - Comprehensive data quality and business rule enforcement
6. **Workflow integration** - Support for complex business processes

### Key Use Cases
- **Vendor Creation**: Initial vendor registration forms
- **Vendor Updates**: Ongoing vendor information maintenance
- **Vendor Onboarding**: Comprehensive onboarding processes
- **Conditional Logic**: Dynamic form behavior based on user input
- **Multi-step Forms**: Complex forms with repeatable sections

## Development Guidelines

### Architecture Principles
1. **Service-Oriented Design**: Business logic in dedicated service classes
2. **Single Responsibility**: Each class has a focused, specific purpose
3. **API-First**: All functionality exposed through well-designed APIs
4. **Validation Layers**: Multiple validation levels for data integrity
5. **State Management**: Clear state transitions with proper validation

### Code Organization
- **Controllers**: Thin controllers, delegate to services
- **Services**: Business logic and complex operations
- **Models**: Data relationships and basic validations
- **Validators**: Reusable validation logic
- **Serializers**: Consistent API response formatting

This architecture provides a scalable, maintainable foundation for complex vendor management workflows while maintaining clear separation of concerns and high testability.