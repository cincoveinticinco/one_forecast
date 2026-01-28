FROM ruby:3.2-slim-bullseye

WORKDIR /app

RUN apt-get update -qq && \
    apt-get install -y \
    build-essential \
    libmariadb-dev \
    libyaml-dev \
    gnupg2 \
    curl \
    software-properties-common \
    default-mysql-client && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY Gemfile* ./
RUN bundle install

COPY . .

EXPOSE 3000

CMD ["rails", "s", "-b", "0.0.0.0"]
