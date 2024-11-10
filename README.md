### Запуск через докер

- Ввести команду в консоль

```bash
docker-compose -f "docker-compose.yaml" up --build
docker-compose -f "docker-compose.client.yaml" up --build
docker-compose -f "docker-compose.bd.yaml" up --build
docker-compose -f "docker-compose.server.yaml" up --build
```

- Открыть `http://localhost:3000`

### Версии
node v20.14.0
