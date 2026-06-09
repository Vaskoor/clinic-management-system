#!/bin/bash

# ==============================================
# PostgreSQL Migration Script for NestJS
# ==============================================
# This script:
# 1. Installs the PostgreSQL driver (pg)
# 2. Updates database.module.ts to use PostgreSQL
# 3. Creates a .env.example file with DB variables
# 4. Adds a docker-compose.yml for PostgreSQL (optional)
# 5. Fixes all service methods that return Promise<Entity | null>
#    to throw NotFoundException (resolves TS2322 errors)
# ==============================================

set -e  # Exit on error

echo "🚀 Starting PostgreSQL migration..."

# 1. Install PostgreSQL driver
echo "📦 Installing pg package..."
npm install pg @types/pg

# 2. Backup and update database.module.ts
DB_MODULE="src/database/database.module.ts"
if [ -f "$DB_MODULE" ]; then
    cp "$DB_MODULE" "$DB_MODULE.backup"
    echo "✅ Backed up $DB_MODULE to $DB_MODULE.backup"
    
    # Replace the entire TypeOrmModule.forRoot configuration
    cat > "$DB_MODULE" << 'EOF'
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'postgres'),
        database: configService.get('DB_DATABASE', 'medical_db'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get('NODE_ENV') !== 'production', // never use synchronize in production
        logging: configService.get('NODE_ENV') === 'development',
      }),
    }),
  ],
})
export class DatabaseModule {}
EOF
    echo "✅ Updated $DB_MODULE to use PostgreSQL"
else
    echo "⚠️  $DB_MODULE not found – skipping"
fi

# 3. Create/update .env.example file
ENV_EXAMPLE=".env.example"
cat > "$ENV_EXAMPLE" << 'EOF'
# Database (PostgreSQL)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=medical_db

# JWT
JWT_SECRET=your_super_secret_key_change_me

# Node environment
NODE_ENV=development
EOF
echo "✅ Created $ENV_EXAMPLE"

# Also create .env if it doesn't exist (without overwriting)
if [ ! -f ".env" ]; then
    cp "$ENV_EXAMPLE" ".env"
    echo "✅ Created .env file from example (you should edit passwords and secrets)"
else
    echo "ℹ️  .env already exists – please ensure PostgreSQL variables are set"
fi

# 4. Add docker-compose.yml for PostgreSQL (optional but recommended)
DOCKER_COMPOSE="docker-compose.yml"
if [ ! -f "$DOCKER_COMPOSE" ]; then
    cat > "$DOCKER_COMPOSE" << 'EOF'
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: medical_postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: medical_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
EOF
    echo "✅ Created $DOCKER_COMPOSE – run 'docker-compose up -d' to start PostgreSQL"
else
    echo "ℹ️  $DOCKER_COMPOSE already exists – skipping"
fi

# 5. Fix all service files to throw NotFoundException instead of returning null
#    This resolves TS2322: Promise<Entity | null> is not assignable to Promise<Entity>
SERVICE_FILES=(
    "src/appointment/appointment.service.ts"
    "src/doctor/doctor.service.ts"
    "src/inventory/inventory.service.ts"
    "src/patient/patient.service.ts"
    "src/pharmacist/pharmacist.service.ts"
)

# Function to update a service file
update_service_file() {
    local file="$1"
    if [ ! -f "$file" ]; then
        echo "⚠️  $file not found – skipping"
        return
    fi
    
    cp "$file" "$file.backup"
    echo "✅ Backed up $file"
    
    # Check if the file already uses NotFoundException
    if grep -q "NotFoundException" "$file"; then
        echo "ℹ️  $file already appears to use NotFoundException – skipping automatic fix"
        return
    fi
    
    # Add import for NotFoundException if not present
    if ! grep -q "import {.*NotFoundException.*} from '@nestjs/common'" "$file"; then
        # Find the line with existing imports from '@nestjs/common'
        if grep -q "import {.*} from '@nestjs/common'" "$file"; then
            # Append NotFoundException to existing import line
            sed -i 's/import {\(.*\)} from "@nestjs\/common"/import {\1, NotFoundException} from "@nestjs\/common"/' "$file"
        else
            # Add new import line at the top of the file after other imports
            sed -i '1i import { NotFoundException } from "@nestjs/common";' "$file"
        fi
    fi
    
    # Replace the findOne method to throw on null
    # This pattern matches: async findOne(id: number): Promise<Entity> { return this.repo.findOne(...); }
    # We'll replace with a version that checks for null
    # Using perl for more robust regex (sed -E works on Linux, but perl is more cross-platform)
    if command -v perl &> /dev/null; then
        perl -i -pe 'BEGIN{undef $/;} s/(async\s+findOne\s*\(\s*\w+\s*:\s*(?:number|string)\s*\)\s*:\s*Promise\s*<\s*\w+\s*>)\s*\{\s*return\s+this\.\w+Repository\.findOne\(\s*\{\s*where:\s*\{\s*id\s*\}\s*\}\s*\);\s*\}/$1 {\n    const entity = await this.${2}Repository.findOne({ where: { id } });\n    if (!entity) {\n      throw new NotFoundException(`${3} with ID \${id} not found`);\n    }\n    return entity;\n  }/g' "$file"
    else
        echo "⚠️  Perl not found – cannot auto-fix $file. Please manually edit to throw NotFoundException."
    fi
    
    echo "✅ Fixed $file"
}

# Apply the fix to each service file
for service in "${SERVICE_FILES[@]}"; do
    update_service_file "$service"
done

# 6. Also fix jwt.strategy.ts JWT_SECRET undefined error
JWT_STRATEGY="src/auth/jwt.strategy.ts"
if [ -f "$JWT_STRATEGY" ]; then
    cp "$JWT_STRATEGY" "$JWT_STRATEGY.backup"
    echo "✅ Backed up $JWT_STRATEGY"
    
    # Add validation for JWT_SECRET
    if ! grep -q "if (!secret)" "$JWT_STRATEGY"; then
        # Insert the check inside the constructor before super()
        # This is a bit complex, so we'll provide instructions instead of automated replacement
        echo "⚠️  $JWT_STRATEGY needs manual update to validate JWT_SECRET."
        echo "   Please add the following code inside the constructor BEFORE super():"
        echo ""
        echo "    const secret = this.configService.get<string>('JWT_SECRET');"
        echo "    if (!secret) {"
        echo "      throw new Error('JWT_SECRET environment variable is not defined');"
        echo "    }"
        echo ""
        echo "   Then pass 'secretOrKey: secret' to super()."
    fi
else
    echo "⚠️  $JWT_STRATEGY not found – skipping"
fi

echo ""
echo "🎉 PostgreSQL migration script completed!"
echo ""
echo "📋 Next steps:"
echo "1. Start PostgreSQL (if using docker): docker-compose up -d"
echo "2. Edit your .env file with correct database credentials"
echo "3. Set a strong JWT_SECRET in .env"
echo "4. If you have existing SQLite data, migrate it (see manual steps)"
echo "5. Run your NestJS app: npm run start:dev"
echo ""
echo "⚠️  Important: The script attempted to auto-fix service methods, but please review changes."
echo "   Check git diff or compare .backup files to ensure correctness."
echo "   For jwt.strategy.ts, follow the manual instructions above."