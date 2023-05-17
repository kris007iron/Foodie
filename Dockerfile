# Stage 1: Build the .NET app and React frontend
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /app
EXPOSE 80
EXPOSE 443
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
# Copy and restore .NET project files
COPY *.csproj ./
RUN dotnet restore

# Copy the entire project
COPY . ./

# Build the .NET app
RUN dotnet publish -c Release -o out

# Build the React frontend
WORKDIR /app/ClientApp
RUN npm install --silent
RUN npm run build

# Stage 2: Create the final image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
RUN apt-get install -y nodejs
WORKDIR /app

# Copy the build artifacts from the previous stage
COPY --from=build /app/out .

# Set up environment variables for database connection

# Expose the port

# Define the entry point
ENTRYPOINT ["dotnet", "Foodie.dll"]
