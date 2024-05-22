# Change to the directory of your C# server
Set-Location C:\Users\gled9\Desktop\Project---2024\Server

# Run the C# server (assuming you're using dotnet)
Start-Process "dotnet" -ArgumentList "run --project Server/Server.csproj" -NoNewWindow



# Change to the directory of your React client
Set-Location C:\Users\gled9\Desktop\Project---2024\Client\react-project-2024

# Install dependencies if not already installed
npm install

# Run the React client
npm start