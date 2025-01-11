// @ts-check

export default {
  translation: {
    appName: 'Менеджер задач',
    flash: {
      session: {
        create: {
          success: 'Вы залогинены',
          error: 'Неправильный емейл или пароль',
        },
        delete: {
          success: 'Вы разлогинены',
        },
      },
      users: {
        create: {
          error: 'Не удалось зарегистрировать',
          success: 'Пользователь успешно зарегистрирован',
        },
        update: {
          error: 'Не удалось обновить пользователя',
          success: 'Пользователь обновлён',
          notFound: 'Пользователь не найден',
        },
        delete: {
          error: 'Не удалось удалить пользователя',
          success: 'Пользователь удалён',
          notFound: 'Пользователь не найден',
          hasTasks: 'Пользователь имеет задачи',
        },
      },
      statuses: {
        create: {
          error: 'Не удалось создать статус',
          success: 'Статус успешно создан',
        },
        update: {
          error: 'Не удалось обновить статус',
          success: 'Статус обновлён',
          notFound: 'Статус не найден',
        },
        delete: {
          error: 'Не удалось удалить статус',
          success: 'Статус удалён',
          notFound: 'Статус не найден',
          hasTasks: 'Статус имеет задачи',
        },
      },
      authError: 'Доступ запрещён! Пожалуйста, авторизируйтесь.',
    },
    layouts: {
      application: {
        users: 'Пользователи',
        signIn: 'Вход',
        signUp: 'Регистрация',
        signOut: 'Выход',
        edit: 'Изменить',
        delete: 'Удалить',
        tasks: 'Задачи',
      },
    },
    views: {
      session: {
        new: {
          signIn: 'Вход',
          submit: 'Войти',
        },
      },
      users: {
        id: 'ID',
        email: 'Email',
        firstName: 'Имя',
        lastName: 'Фамилия',
        createdAt: 'Дата создания',
        new: {
          submit: 'Сохранить',
          signUp: 'Регистрация',
        },
        edit: {
          edit: 'Изменить',
          submit: 'Сохранить',
        },
      },
      statuses: {
        id: 'ID',
        name: 'Название',
        createdAt: 'Дата создания',
        new: {
          createStatus: 'Создать статус',
          submit: 'Сохранить',
        },
        edit: {
          editStatus: 'Изменить статус',
          submit: 'Сохранить',
        },
      },
      tasks: {
        id: 'ID',
        name: 'Имя',
        description: 'Описание',
        status: 'Статус',
        creator: 'Создатель',
        executor: 'Исполнитель',
        createdAt: 'Дата создания',
        tasks: 'Задачи',
        noExecutor: 'Нет исполнителя',
        selectExecutor: 'Выберите исполнителя',
        selectStatus: 'Выберите статус',
        new: {
          createTask: 'Создать задачу',
          submit: 'Создать',
        },
        edit: {
          editTask: 'Изменить задачу',
          submit: 'Сохранить',
        },
      },
      welcome: {
        index: {
          hello: 'Добро пожаловать в Менеджер задач',
          description: 'Управляйте своими задачами эффективно и результативно.',
        },
      },
    },
  },
};
