# Change to the directory of your C# server
Set-Location "./Server"

# Run the C# server
Start-Process "dotnet" -ArgumentList "run --project Server/Server.csproj" -NoNewWindow

# Change to the directory of your React client
Set-Location "../Client/react-project-2024"

# Install dependencies if not already installed
npm i

# Run the React client
npm start