### Версии
Клиент: node v20.14.0
Сервер: node v16.20.1

### Запуск через докер

- Ввести команду в консоль

```bash
docker-compose -f "docker-compose.yaml" up --build
```

- Открыть `http://localhost:3000`

### Реализовано:
- Регистрация, авторизация, рефреш токена
- Игра (офлайн) с настройками
- Реализация онлайн игры с двумя игроками через ws соединение

### Планы (имею опыт реализации на фронте):
- Если получится, то выложить на github pages (никогда не пробовал выкладывать с бэком)
- Пуш уведомления

### Другие команды

* Запустить клиент:

```bash
docker-compose -f "docker-compose.client.yaml" up --build
```
* Запустить базу данный:

```bash
docker-compose -f "docker-compose.bd.yaml" up --build
```

* Запустить базу данный и сервер:

```bash
docker-compose -f "docker-compose.server.yaml" up --build
```
