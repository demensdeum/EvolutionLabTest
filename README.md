
## Архитектура Базы Данных (Прогресс пользователя)

По требованию: **все статусы хранятся явно в БД**.

### 1. Таблицы

*   **`users`**: Пользователи.
    *   `id` (PK), `email`, `name`
*   **`lessons`**: Уроки.
    *   `id` (PK), `title`, `order_index`
*   **`user_lesson_status`**: Явное состояние каждого урока для пользователя.
    *   `user_id` (FK)
    *   `lesson_id` (FK)
    *   `status` (ENUM: 'locked', 'active', 'done') — **храним состояние здесь**.
    *   `updated_at` (TIMESTAMP)

### 2. Логика работы

Вместо вычислений "на лету", мы обновляем записи в `user_lesson_status` при наступлении событий:

1.  **Регистрация пользователя**:
    *   Создаем записи для **всех** уроков.
    *   Урок #1 -> `status: 'active'`
    *   Остальные -> `status: 'locked'`

2.  **Завершение урока (N)**:
    *   Транзакция:
        *   Обновляем урок N -> `status: 'done'`
        *   Обновляем урок N+1 -> `status: 'active'`

### 3. API и Фронтенд

API становится предельно простым. Мы просто делаем `SELECT` из таблицы `user_lesson_status` и отдаем массив как есть.

```sql
SELECT l.id, l.title, uls.status 
FROM lessons l
JOIN user_lesson_status uls ON l.id = uls.lesson_id
WHERE uls.user_id = :currentUserId
ORDER BY l.order_index;
```

Фронтенд получает "честный" JSON, полностью совпадающий с состоянием в базе.

