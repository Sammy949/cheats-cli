// Docker CLI Commands Module for Helpsheet
// This module provides comprehensive Docker command reference

const topics = {
  "Container Management": [
    { cmd: "docker run <image>", desc: "Runs a container from an image" },
    { cmd: "docker run -d <image>", desc: "Runs container in detached mode" },
    { cmd: "docker run -p 8080:80 <image>", desc: "Maps host port 8080 to container port 80" },
    { cmd: "docker run -v /host/path:/container/path <image>", desc: "Mounts a volume" },
    { cmd: "docker ps", desc: "Lists running containers" },
    { cmd: "docker ps -a", desc: "Lists all containers (including stopped)" },
    { cmd: "docker stop <container>", desc: "Stops a running container" },
    { cmd: "docker start <container>", desc: "Starts a stopped container" },
    { cmd: "docker restart <container>", desc: "Restarts a container" },
    { cmd: "docker rm <container>", desc: "Removes a container" },
    { cmd: "docker rm -f <container>", desc: "Force removes a running container" }
  ],
  
  "Image Management": [
    { cmd: "docker images", desc: "Lists all images" },
    { cmd: "docker pull <image>", desc: "Downloads an image from registry" },
    { cmd: "docker build -t <name> .", desc: "Builds image from Dockerfile" },
    { cmd: "docker build -t <name>:<tag> .", desc: "Builds image with specific tag" },
    { cmd: "docker rmi <image>", desc: "Removes an image" },
    { cmd: "docker rmi -f <image>", desc: "Force removes image even if used by containers" },
    { cmd: "docker tag <image> <new-name>", desc: "Tags an image with a new name" },
    { cmd: "docker save <image> > file.tar", desc: "Saves image to tar file" },
    { cmd: "docker load < file.tar", desc: "Loads image from tar file" }
  ],
  
  "Networking": [
    { cmd: "docker network ls", desc: "Lists all networks" },
    { cmd: "docker network create <name>", desc: "Creates a new network" },
    { cmd: "docker network connect <network> <container>", desc: "Connects container to network" },
    { cmd: "docker network disconnect <network> <container>", desc: "Disconnects container from network" },
    { cmd: "docker network rm <network>", desc: "Removes a network" },
    { cmd: "docker network inspect <network>", desc: "Shows network details" }
  ],
  
  "Volumes & Data": [
    { cmd: "docker volume ls", desc: "Lists all volumes" },
    { cmd: "docker volume create <name>", desc: "Creates a new volume" },
    { cmd: "docker volume rm <name>", desc: "Removes a volume" },
    { cmd: "docker volume inspect <name>", desc: "Shows volume details" },
    { cmd: "docker cp <container>:/path /host/path", desc: "Copies files from container to host" },
    { cmd: "docker cp /host/path <container>:/path", desc: "Copies files from host to container" }
  ],
  
  "System & Info": [
    { cmd: "docker info", desc: "Shows Docker system information" },
    { cmd: "docker version", desc: "Shows Docker version information" },
    { cmd: "docker system df", desc: "Shows Docker disk usage" },
    { cmd: "docker system prune", desc: "Removes unused data" },
    { cmd: "docker stats", desc: "Shows real-time container statistics" },
    { cmd: "docker logs <container>", desc: "Shows container logs" },
    { cmd: "docker logs -f <container>", desc: "Follows container logs" },
    { cmd: "docker exec -it <container> bash", desc: "Opens interactive bash in container" }
  ],
  
  "Docker Compose": [
    { cmd: "docker-compose up", desc: "Starts services defined in docker-compose.yml" },
    { cmd: "docker-compose up -d", desc: "Starts services in detached mode" },
    { cmd: "docker-compose down", desc: "Stops and removes services" },
    { cmd: "docker-compose ps", desc: "Lists services status" },
    { cmd: "docker-compose logs", desc: "Shows logs from all services" },
    { cmd: "docker-compose logs <service>", desc: "Shows logs from specific service" },
    { cmd: "docker-compose build", desc: "Builds service images" },
    { cmd: "docker-compose restart", desc: "Restarts all services" }
  ]
};

// Module metadata and exports
const dockerModule = {
  name: "Docker",
  description: "Container platform commands and workflows",
  icon: "🐳",
  topics: topics,
  // Function to get available categories
  getCategories: () => Object.keys(topics),
  // Function to get commands for a specific category
  getCommands: (category) => topics[category] || [],
  // Function to search commands
  searchCommands: (query) => {
    const results = [];
    Object.entries(topics).forEach(([category, commands]) => {
      commands.forEach(command => {
        if (command.cmd.toLowerCase().includes(query.toLowerCase()) || 
            command.desc.toLowerCase().includes(query.toLowerCase())) {
          results.push({ ...command, category });
        }
      });
    });
    return results;
  }
};

module.exports = dockerModule;
