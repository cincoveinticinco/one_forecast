# OneForecast

A modern Ruby on Rails form management platform with multi-tenant support, designed for dynamic form creation, submission handling, and vendor onboarding workflows.

## Features

- 🏗️ **Dynamic Form Builder**: Create complex forms with various field types
- 🏢 **Multi-Tenant Architecture**: Isolated data per tenant/organization
- 📝 **Form Templates**: Pre-built templates for vendor workflows
- 🔄 **Form Submissions**: Full lifecycle management (draft → submitted → reopened)
- 🌐 **API Support**: RESTful API with CORS support
- 📱 **PWA Ready**: Progressive Web App capabilities
- 🔒 **Access Control**: Internal and public token-based access
- 🚀 **Modern Stack**: Rails 8, Hotwire, Stimulus, ImportMaps

## System Requirements

- **Ruby**: 3.3+ (recommended)
- **Rails**: 8.0.4+
- **Database**: MySQL 8.0+
- **Node.js**: 18+ (for asset compilation)
- **Docker**: Optional for containerized deployment

## Getting Started

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/cincoveinticinco/one_forecast.git
   cd one_forecast
   ```

2. **Install dependencies**

   ```bash
   bundle install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database setup**

   ```bash
   rails db:create
   rails db:migrate
   rails db:seed
   ```

5. **Start the server**

   ```bash
   bin/dev
   ```

   Visit [http://localhost:3000](http://localhost:3000)

### Docker Development

1. **Build and run with Docker**
   ```bash
   docker build -t one_forecast .
   docker run -p 3000:3000 one_forecast
   ```

## Architecture Overview

### Core Models

- **Tenant**: Multi-tenant isolation
- **FormTemplate**: Reusable form definitions
- **FormField**: Individual form components with various types
- **FormSubmission**: User-submitted form data
- **Country**: Geographic data support

### Field Types Supported

**Content Fields:**

- Heading, Subheading, Paragraph

**Structure Fields:**

- Section, Repeatable Group, Block

**Input Fields:**

- Text, Textarea, Number, Date
- Select, Multiselect, Checkbox
- Email, Phone

### Form Template Types

- **Vendor Creation**: New vendor registration
- **Vendor Update**: Existing vendor information updates
- **Vendor Onboarding**: Complete onboarding workflows

## API Documentation

### Authentication

- Internal access for authenticated users
- Public token-based access for external integrations

### Key Endpoints

```
GET    /api/form_templates      # List available templates
POST   /api/form_submissions    # Submit form data
GET    /api/form_submissions/:id # Retrieve submission
PATCH  /api/form_submissions/:id # Update submission
```

## Testing

```bash
# Run the full test suite
rails test

# Run specific test files
rails test test/models/form_field_test.rb

# Run system tests
rails test:system
```

## Code Quality

```bash
# Security analysis
bin/brakeman

# Code style checking
bin/rubocop

# Auto-fix style issues
bin/rubocop -a
```

## Deployment

### Using Kamal (Recommended)

1. **Configure deployment**

   ```bash
   # Edit config/deploy.yml
   kamal setup
   ```

2. **Deploy**
   ```bash
   kamal deploy
   ```

### Manual Deployment

1. **Prepare production environment**

   ```bash
   RAILS_ENV=production rails assets:precompile
   RAILS_ENV=production rails db:migrate
   ```

2. **Start with production settings**
   ```bash
   RAILS_ENV=production rails server
   ```

## Background Jobs

The application uses Solid Queue for background job processing:

```bash
# Start job processing
rails solid_queue:start

# Monitor jobs
rails solid_queue:monitor
```

## Configuration

### Environment Variables

```bash
# Database
DATABASE_URL=mysql2://user:password@localhost/one_forecast_production

# Security
SECRET_KEY_BASE=your_secret_key

# CORS (if needed)
CORS_ORIGINS=https://yourdomain.com
```

### Cache & Storage

- **Cache**: Solid Cache (database-backed)
- **Queue**: Solid Queue (database-backed)
- **Cable**: Solid Cable (database-backed)
- **Storage**: Active Storage with local/cloud providers

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow Rails conventions and best practices
- Use concerns for shared functionality (see `app/models/concerns/`)
- Write comprehensive tests
- Run code quality checks before submitting

## Performance Considerations

- Database indexing on frequently queried fields
- Caching strategies for form templates
- Background job processing for heavy operations
- Asset optimization with Propshaft

## Security

- Regular security audits with Brakeman
- CORS configuration for API access
- Input validation and sanitization
- Tenant data isolation

## License

[Add your license information here]

## Support

For questions and support:

- Create an issue in this repository
- Contact the development team
- Check the wiki for additional documentation
